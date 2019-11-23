'use strict';

import Path from 'path';
import Glob from 'glob';
import _ from 'lodash';
import { minify } from 'html-minifier';
import Ejs from 'ejs';
import LRU from 'lru-cache';
import PluginManagementLib from "../libs/plugin_management";
import fs from "fs";

Ejs.cache = LRU(100); // LRU cache with 100-item limit

module.exports = async function (server) {
  await server.register([
    require('vision'),
    require('inert'),
    {
      plugin: require(BASE_PATH + '/app/libs/kea-config.js'),
      options: {
        confPath: BASE_PATH + '/app/config',
        decorateServer: true
      }
    },
    // {
    //   // Kết nối redis
    //   plugin: require(BASE_PATH + '/app/libs/redis.js')
    // },
    {
      // Kết nối mongodb
      plugin: require(BASE_PATH + '/app/libs/mongo.js')
    }, {
      // Plugin xử lý để load các file tĩnh
      plugin: require(BASE_PATH + '/app/libs/static.js')
    },
    {
      // Plugin xử lý xác thực user
      plugin: require(BASE_PATH + '/app/libs/auth.js')
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

  global.BaseController = (require(BASE_PATH + `/app/plugins/core/controllers/base.controller.js`)).default;
  global.ResourcesController = (require(BASE_PATH + `/app/plugins/cms/controllers/resources.controller.js`)).default;
  global.Routes = (require(BASE_PATH + `/app/plugins/cms/classes/routes.js`)).default;
  global.ServerRouter = (require(BASE_PATH + `/app/plugins/core/classes/server_router.js`)).default;

  let plugins = [];
  let pluginsName = Glob.sync(BASE_PATH + `/app/plugins/*/index.js`, {});
  pluginsName.forEach((item) => {
    plugins.push(loadPluginAdapter(require(Path.resolve(`${item}`))));
  });
  if (plugins.length) {
    try {
      await server.register(plugins, {});
      await PluginManagementLib.getInstance().addPluginManagements();
      await PluginManagementLib.getInstance().removePluginManagements();
    } catch (error) {
      if (error) {
        console.log('Plugin loading error:', error);
        server.log(['error', 'server'], error);
      }
    }
  }

  loadVuexStoreConfigs();
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
    let pluginName = item.match(/plugins\/([^\/]+)\/views\/js\/store_config.js/)[1];
    importScript += `import ${pluginName} from '@/${pluginName}/views/js/store_config';\n`;
    exportScript += `${pluginName},\n`
  });
  fs.writeFileSync(BASE_PATH + '/app/plugins/core/views/vuex/store_config.js', `
    ${importScript}

    export default {
      ${exportScript}
    }
  `);
}
