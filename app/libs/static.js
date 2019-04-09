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

        server.expose('getAssets', function () {
            var assetsJs = asset.getAssets(config.assets.include.js, 'public/');
            var assetsCss = asset.getAssets(config.assets.include.css, 'public/');

            var cmsAssetsJs = asset.getAssets(config.assets.cms.js, 'public/');
            var cmsAssetsCss = asset.getAssets(config.assets.cms.css, 'public/');

            return {
                assets: { css: assetsCss, js: assetsJs, cmsCss: cmsAssetsCss, cmsJs: cmsAssetsJs },
                cookieKey: COOKIE_NAME
            };
        });
    },
    name: 'app-static',
    dependencies: 'inert'
}
