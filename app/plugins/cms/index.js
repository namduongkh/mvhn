'use strict';

const CmsController = require('./controllers/cms.controller.js');

exports.plugin = {
    register: function (server, options, next) {
        server.route({
            method: 'GET',
            path: '/cms',
            config: CmsController.index
        });

        server.route({
            method: 'GET',
            path: '/cms/login',
            config: CmsController.login
        });
    },
    name: 'cms'
};
