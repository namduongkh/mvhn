'use strict';

const Controller = require('./controllers/user.controller.js');

exports.register = function(server, options, next) {
    var configManager = server.plugins['hapi-kea-config'];

    server.route({
        method: 'GET',
        path: '/',
        config: Controller.index
    });

    server.route({
        method: 'POST',
        path: '/api/user/login',
        config: Controller.login
    });

    server.route({
        method: 'GET',
        path: '/api/user/logout',
        config: Controller.logout
    });

    server.route({
        method: 'POST',
        path: '/api/user/register',
        config: Controller.register
    });

    server.route({
        method: 'GET',
        path: '/api/user/account',
        config: Controller.account
    });

    server.route({
        method: 'GET',
        path: '/api/user/generateAdmin',
        config: Controller.generateAdmin
    });

    server.route({
        method: 'GET',
        path: '/api/user/getCart',
        config: Controller.getCart
    });

    server.route({
        method: 'POST',
        path: '/api/user/removeCartItem',
        config: Controller.removeCartItem
    });

    server.route({
        method: 'POST',
        path: '/api/user/updateCart',
        config: Controller.updateCart
    });

    next();
};

exports.register.attributes = {
    name: 'api-user'
};