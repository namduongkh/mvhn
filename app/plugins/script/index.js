'use strict';

import mongoose from 'mongoose';
import ScriptsController from './controllers/scripts_controller.js';
import { ServerRouter, Routes, ResourcesController } from "@core/modules";

const Script = mongoose.model('Script');

exports.register = function (server, options, next) {
    const serverRouter = new ServerRouter(server);
    const cmsRoutes = new Routes(server);
    cmsRoutes.resources(ResourcesController, 'scripts', Script);

    serverRouter.resources('scripts', ScriptsController, {
        only: []
    }).member('{id}/run', {
        method: ['GET', 'POST'],
        action: 'run'
    }, {
        auth: {
            strategy: 'jwt',
            scope: ['admin', 'script-runner']
        }
    });
};

exports.register.attributes = {
    name: 'script'
};
