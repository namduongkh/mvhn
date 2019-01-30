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

    server.ext('onPreResponse', function (request, reply) {
        if (request.response.variety === 'view') {
            request.response.source.context = request.response.source.context || {};
            request.response.source.context.assets = { css: assetsCss, js: assetsJs };
        }

        reply.continue();
    });

    return next();
};

exports.register.attributes = {
    name: 'app-static',
    dependencies: 'inert'
};