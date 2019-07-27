'use strict';

import mongoose from 'mongoose';
import PluginManagementsController from './controllers/plugin_managements.controller.js';
import CmsPluginManagementsController from './controllers/cms_plugin_managements.controller.js';
const PluginManagement = mongoose.model('PluginManagement');

exports.register = function (server, options, next) {
    const routes = new Routes(server);
    routes.resources(CmsPluginManagementsController, 'plugin_managements', PluginManagement);
};

exports.register.attributes = {
    name: 'plugin_management'
};