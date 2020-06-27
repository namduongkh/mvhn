'use strict';

import mongoose from 'mongoose';
import SettingsController from './controllers/settings.controller.js';
import CmsSettingsController from './controllers/cms_settings.controller.js';
import { Routes } from "@core/modules";

const Setting = mongoose.model('Setting');

exports.register = function (server, options, next) {
    const routes = new Routes(server);
    routes.resources(CmsSettingsController, 'settings', Setting);

    server.route({
        method: 'GET',
        path: '/settings',
        config: new SettingsController('example').routeConfig()
    })
};

exports.register.attributes = {
    name: 'setting'
};
