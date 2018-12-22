'use strict';

const path = require('path');
const asset = require('../utils/asset');

exports.register = function (server, options, next) {
    server.route({
        method: 'GET',
        path: '/modules/{module}/views/js/template/{file}',
        handler: function (request, reply) {
            let file = 'app/modules/' + request.params.module + '/views/js/template/' + request.params.file;
            reply.file(file);
        },
        config: {
            auth: false
        }
    });

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

    // console.log(config.adminassets.js,"adminassets");

    // var assetsAdminJs = asset.getAssets(config.adminassets.js, 'node_modules/');
    // var assetsAdminCss = asset.getAssets(config.adminassets.css, 'node_modules/');

    server.ext('onPreResponse', function (request, reply) {
        if (request.response.variety === 'view') {
            request.response.source.context = request.response.source.context || {};
            request.response.source.context.assets = { css: assetsCss, js: assetsJs };
            // request.response.source.context.adminassets = { css: assetsAdminCss, js: assetsAdminJs };
            // request.response.source.context.cookieKey = COOKIE_NAME_WEB;
            // request.response.source.context.cookieCmsKey = COOKIE_NAME_ADMIN;
        }

        reply.continue();
    });

    return next();
};

exports.register.attributes = {
    name: 'app-static',
    dependencies: 'inert'
};