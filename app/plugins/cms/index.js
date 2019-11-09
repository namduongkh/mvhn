'use strict';

const CmsController = require('./controllers/cms.controller.js');

exports.plugin = {
    register: function (server, options, next) {
        const configManager = server.configManager;
        let cmsPath = configManager.get('web.context.cmsprefix');

        server.route({
            method: 'GET',
            path: `/${cmsPath}`,
            config: CmsController.index
        });

        server.route({
            method: 'GET',
            path: `/${cmsPath}/`,
            config: CmsController.index
        });

        server.route({
            method: 'GET',
            path: `/${cmsPath}/login`,
            config: CmsController.login
        });

        server.route({
            method: ['GET', 'POST'],
            path: `/${cmsPath}/fetchUrl`,
            config: CmsController.fetchUrl
        });
    },
    name: 'cms'
};
