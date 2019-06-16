'use strict';

import mongoose from 'mongoose';
import UserRightsController from './controllers/user_rights.controller.js';
const UserRight = mongoose.model('UserRight');

exports.register = function (server, options, next) {
    const routes = new Routes(server);
    routes.resources(ResourcesController, 'user_rights', UserRight);

    server.route({
        method: 'GET',
        path: '/user_rights',
        config: new UserRightsController('example').routeConfig()
    })
};

exports.register.attributes = {
    name: 'user_right'
};