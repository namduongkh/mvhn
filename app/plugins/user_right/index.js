'use strict';

import mongoose from 'mongoose';
import UserRightsController from './controllers/user_rights.controller.js';
import CmsUserRightsController from './controllers/cms_user_rights.controller';
const UserRight = mongoose.model('UserRight');

exports.register = function (server, options, next) {
    const routes = new Routes(server);
    routes.resources(CmsUserRightsController, 'user_rights', UserRight);

    server.route({
        method: 'GET',
        path: '/user_rights',
        config: new UserRightsController('example').routeConfig()
    })
};

exports.register.attributes = {
    name: 'user_right'
};