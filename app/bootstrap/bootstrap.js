'use strict';

import Glob from 'glob';
import _ from 'lodash';
import Ejs from 'ejs';
import LRU from 'lru-cache';
import PluginManagementLib from '../libs/plugin_management';
import fs from 'fs';
import path from 'path';

Ejs.cache = LRU(100); // LRU cache with 100-item limit

module.exports = async function (server) {
  await server.register([
    require('vision'),
    require('inert'),
    {
      plugin: require('@root/app/libs/kea-config.js'),
      options: {
        confPath: BASE_PATH + '/app/config',
        decorateServer: true
      }
    },
    {
      // Kết nối redis
      plugin: require('@root/app/libs/redis.js')
    },
    {
      // Kết nối mongodb
      plugin: require('@root/app/libs/mongo.js')
    },
    {
      // Plugin xử lý để load các file tĩnh
      plugin: require('@root/app/libs/static.js')
    },
    {
      // Plugin xử lý xác thực user
      plugin: require('@root/app/libs/auth.js')
    },
  ]);

  let config = server.configManager;

  server.views({
    engines: { html: Ejs },
    layoutPath: global.BASE_PATH + '/app/templates',
    layout: true,
    path: global.BASE_PATH + '/app/plugins',
    context: config.get('web.context')
  });

  let pluginPaths = fs.readdirSync(path.join(BASE_PATH, 'app', 'plugins'), { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  for (let i in pluginPaths) {
    try {
      if (process.env.NODE_ENV !== 'development') {
        var plugin = require(path.resolve(BASE_PATH, 'app', 'plugins', pluginPaths[i], 'index.js'));
      } else {
        var plugin = require(`@plugins/${pluginPaths[i]}/index.js`);
      }
      await server.register(loadPluginAdapter(plugin), {});
    } catch (error) {
      console.log('Plugin loading error:', error);
    }
  }

  loadVuexStoreConfigs();
  loadCmsPlugins();
}

function loadPluginAdapter(pluginLoader) {
  if (pluginLoader.plugin) {
    PluginManagementLib.getInstance().addPlugin(pluginLoader.plugin.name);

    return pluginLoader;
  } else {
    PluginManagementLib.getInstance().addPlugin(pluginLoader.register.attributes.name);

    return {
      plugin: {
        register: pluginLoader.register,
        ...pluginLoader.register.attributes
      }
    }
  }
}

function loadVuexStoreConfigs() {
  let vuexStoreFiles = Glob.sync(BASE_PATH + `/app/plugins/*/views/js/store_config.js`, {});
  let importScript = '';
  let exportScript = '';
  vuexStoreFiles.forEach((item) => {
    let pluginName = item.match(/plugins\/([^\/]+)\/views\/js\/store_config\.js/)[1];
    importScript += `import ${pluginName} from '@/${pluginName}/views/js/store_config';\n`;
    exportScript += `${pluginName},\n`
  });
  fs.writeFile(BASE_PATH + '/app/plugins/core/views/vuex/store_config.js', `
    ${importScript}
    export default {
      ${exportScript}
    }
  `, () => { });
}

function loadCmsPlugins() {
  let cmsIndexFiles = Glob.sync(BASE_PATH + `/app/plugins/*/views/cms/index.js`, {});
  let importScript = '';
  let exportScript = '';
  cmsIndexFiles.forEach((item) => {
    let pluginName = item.match(/plugins\/([^\/]+)\/views\/cms\/index\.js/)[1];
    importScript += `import ${pluginName} from '@app/plugins/${pluginName}/views/cms/index.js';\n`;
    exportScript += `${pluginName},\n`
  });
  fs.writeFile(BASE_PATH + '/app/plugins/cms/views/skin/routers/index.js', `
    ${importScript}
    export default {
      ${exportScript}
    }
  `, () => { });
}
