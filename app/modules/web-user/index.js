'use strict';

const Controller = require('./controllers/user.controller.js');

exports.register = function(server, options, next) {
    var configManager = server.plugins['hapi-kea-config'];

    server.route({
        method: 'GET',
        path: '/dang-nhap',
        config: Controller.dangNhap
    });

    server.route({
        method: 'GET',
        path: '/dang-ky',
        config: Controller.dangKy
    });

    server.route({
        method: 'GET',
        path: '/gio-hang',
        config: Controller.gioHang
    });

    next();
};

exports.register.attributes = {
    name: 'web-user'
};