'use strict';

const CmsController = require('./controllers/cms.controller.js');

exports.plugin = {
    register: function (server, options, next) {
        let config = server.configManager;

        server.route({
            method: 'GET',
            path: '/cms',
            config: CmsController.index
        });
    },
    name: 'cms'
};
