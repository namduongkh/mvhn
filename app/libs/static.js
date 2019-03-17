'use strict';

const path = require('path');
const asset = require('../utils/asset');

exports.plugin = {
    register: function (server, options) {
        server.route({
            method: 'GET',
            path: '/{param*}',
            handler: {
                directory: {
                    path: 'public'
                }
            },
            config: {
                auth: false
            }
        });

        const config = server.configManager.get('web');

        var assetsJs = asset.getAssets(config.assets.include.js, 'public/');
        var assetsCss = asset.getAssets(config.assets.include.css, 'public/');

        server.ext('onPreResponse', function (request, reply) {
            if (request.response.variety === 'view') {
                request.response.source.context = request.response.source.context || {};
                request.response.source.context.assets = { css: assetsCss, js: assetsJs };
            }
            
            return reply.continue;
        });
    },
    name: 'app-static',
    dependencies: 'inert'
}
