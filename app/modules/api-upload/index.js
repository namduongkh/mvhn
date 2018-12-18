'use strict';

const UploadController = require('./controller/upload.controller.js');

exports.register = function(server, options, next) {
    var configManager = server.plugins['hapi-kea-config'];
    let queue = server.plugins['hapi-kue'];

    server.route({
        method: 'GET',
        path: '/api/upload',
        config: UploadController.index
    });

    server.route({
        method: 'POST',
        path: '/api/upload/image',
        config: UploadController.uploadImage
    });

    server.route({
        method: 'POST',
        path: '/api/upload/removeFolder',
        config: UploadController.removeFolder
    });

    let uploadHelper = require('./util/upload')(server, options);
    server.expose('removeFolder', uploadHelper.removeFolder);
    server.expose('removePath', uploadHelper.removePath);

    next();
};

exports.register.attributes = {
    name: 'api-upload'
};