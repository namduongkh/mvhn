'use strict';

const path = require('path');
const asset = require('../utils/asset');

exports.plugin = {
    register: function (server, options) {
        const config = server.configManager.get('web');

        server.route({
            method: 'GET',
            path: '/{param*}',
            handler: {
                directory: {
                    path: `public`
                }
            },
            config: {
                auth: false
            }
        });

        var assetsJs = asset.getAssets(config.assets.include.js, 'public/');
        var assetsCss = asset.getAssets(config.assets.include.css, 'public/');

        var cmsAssetsJs = asset.getAssets(config.assets.cms.js, 'public/');
        var cmsAssetsCss = asset.getAssets(config.assets.cms.css, 'public/');

        server.ext('onPreResponse', function (request, reply) {
            if (request.response.variety === 'view') {
                request.response.source.context = request.response.source.context || {};
                request.response.source.context.assets = { css: assetsCss, js: assetsJs, cmsCss: cmsAssetsCss, cmsJs: cmsAssetsJs };
                request.response.source.context.cookieKey = COOKIE_NAME;
            }

            return reply.continue;
        });
    },
    name: 'app-static',
    dependencies: 'inert'
}
