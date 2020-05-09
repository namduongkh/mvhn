'use strict';

import mongoose from 'mongoose';
import UserGroupsController from './controllers/user_groups.controller.js';
import { Routes, ResourcesController } from "@core/modules";

const UserGroup = mongoose.model('UserGroup');

exports.register = function (server, options, next) {
    const routes = new Routes(server);
    routes.resources(ResourcesController, 'user_groups', UserGroup);

    server.route({
        method: 'GET',
        path: '/user_groups',
        config: new UserGroupsController('example').routeConfig()
    })
};

exports.register.attributes = {
    name: 'user_group'
};
