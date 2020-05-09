'use strict';

import mongoose from 'mongoose';
import <%= controllerName %>Controller from './controllers/<%= collectionName %>_controller.js';
import { ServerRouter, Routes, ResourcesController } from "@core/modules";

const <%= modelName %> = mongoose.model('<%= modelName %>');

exports.register = function (server, options, next) {
    const serverRouter = new ServerRouter(server);
    const cmsRoutes = new Routes(server);
    cmsRoutes.resources(ResourcesController, '<%= collectionName %>', <%= modelName %>);

    serverRouter.resources('<%= collectionName %>', <%= controllerName %>Controller, {
        only: ['index']
    });
};

exports.register.attributes = {
    name: '<%= pluginName %>'
};
