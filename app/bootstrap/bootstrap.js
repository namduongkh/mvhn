'use strict';

import Path from 'path';
import Glob from 'glob';
import _ from 'lodash';
import { minify } from 'html-minifier';
import Ejs from 'ejs';
import LRU from 'lru-cache';
Ejs.cache = LRU(100); // LRU cache with 100-item limit

module.exports = function (server) {
    server.register([{
        register: require('vision')
    }, {
        register: require('inert')
    }, {
    //     // Kết nối mongodb
        register: require('../libs/mongo.js')
    }, {
        // Plugin xử lý để load các file tĩnh
        register: require('../libs/static.js')
    }, {
        // Plugin xử lý xác thực user
        register: require('../libs/auth.js')
    }], (err) => {
        if (err) {
            server.log(['error', 'server'], err);
        }
        let config = server.configManager;

        server.views({
            engines: { html: Ejs },
            layoutPath: global.BASE_PATH + '/app/views/layouts',
            layout: true,
            path: global.BASE_PATH + '/app/modules',
            context: config.get('web.context')
        });

        // Load các models
        let models = Glob.sync(BASE_PATH + "/app/modules/*/models/*.js", {});
        models.forEach((item) => {
            require(Path.resolve(item));
            console.log("Load model:", item);
        });

        // Tùy theo từng connection của từng label mà load các route trong các module thuộc label đó vào
        server.connections.forEach(function (connectionSetting) {
            let labels = connectionSetting.settings.labels;
            labels.forEach(name => {
                let modules = [];
                let modulesName = Glob.sync(BASE_PATH + `/app/modules/*/index.js`, {});
                modulesName.forEach((item) => {
                    modules.push(require(Path.resolve(`${item}`)));
                });
                if (modules.length) {
                    server.register(modules, { select: [name] }, (err) => {
                        if (err) {
                            server.log(['error', 'server'], err);
                        }
                    });
                }
            });
        });

    });
};