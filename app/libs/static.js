'use strict';
import _ from 'lodash';

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
            let template = config.context.template;
            let templates = config.templates.filter(name => name != template);

            let assets = {
                ...getTemplateAssets(template, config),
                ..._.fromPairs(templates.map((name) => { return [name, getTemplateAssets(name, config)] }))
            };

            return {
                assets,
                cookieKey: COOKIE_NAME
            };
        });
    },
    name: 'app-static',
    dependencies: 'inert'
}

function getTemplateAssets(templateName, config) {
    let result = {};

    try { result.css = asset.getAssets(config.assets[templateName].include.css, 'public/'); } catch (error) { }
    try { result.js = asset.getAssets(config.assets[templateName].include.js, 'public/'); } catch (error) { }
    try { result.cmsJs = asset.getAssets(config.assets[templateName].cms.js, 'public/'); } catch (error) { }
    try { result.cmsCss = asset.getAssets(config.assets[templateName].cms.css, 'public/'); } catch (error) { }

    return result;
}
