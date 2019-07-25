'use strict';

import Path from 'path';
import Glob from 'glob';
import _ from 'lodash';
import { minify } from 'html-minifier';
import Ejs from 'ejs';
import LRU from 'lru-cache';
Ejs.cache = LRU(100); // LRU cache with 100-item limit
const Pack = require(global.BASE_PATH + '/package');

global.COOKIE_NAME = Pack.name + '-token';

module.exports = async function (server) {
    await server.register([
        require('vision'),
        require('inert'),
        {
            plugin: require('../libs/kea-config.js'),
            options: {
                confPath: BASE_PATH + '/app/config',
                decorateServer: true
            }
        },
        // {
        //     // Kết nối redis
        //     plugin: require('../libs/redis.js')
        // },
        {
            // Kết nối mongodb
            plugin: require('../libs/mongo.js')
        }, {
            // Plugin xử lý để load các file tĩnh
            plugin: require('../libs/static.js')
        },
        {
            // Plugin xử lý xác thực user
            plugin: require('../libs/auth.js')
        },
    ]);

    let config = server.configManager;

    server.views({
        engines: { html: Ejs },
        layoutPath: global.BASE_PATH + '/app/templates/' + (config.get('web.template') || 'default'),
        layout: true,
        path: global.BASE_PATH + '/app/plugins',
        context: config.get('web.context')
    });

    global.BaseController = (await import(BASE_PATH + `/app/plugins/core/controllers/base.controller.js`)).default;
    global.ResourcesController = (await import(BASE_PATH + `/app/plugins/cms/controllers/resources.controller.js`)).default;
    global.Routes = (await import(BASE_PATH + `/app/plugins/cms/classes/routes.js`)).default;

    let plugins = [];
    let pluginsName = Glob.sync(BASE_PATH + `/app/plugins/*/index.js`, {});
    pluginsName.forEach((item) => {
        plugins.push(loadPluginAdapter(require(Path.resolve(`${item}`))));
    });
    if (plugins.length) {
        try {
            await server.register(plugins, {});
        } catch (error) {
            if (error) {
                console.log('Plugin loading error:', error);
                server.log(['error', 'server'], error);
            }
        }
    }
}

function loadPluginAdapter(plugin_loader) {
    if (plugin_loader.plugin) {
        return plugin_loader;
    } else {
        return {
            plugin: {
                register: plugin_loader.register,
                ...plugin_loader.register.attributes
            }
        }
    }
}
