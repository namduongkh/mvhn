'use strict';

import mongoose from 'mongoose';
import CarpoolsController from './controllers/carpools_controller.js';
import ApiCarpoolsController from './controllers/api_carpools_controller.js';
import { ServerRouter, Routes, ResourcesController } from "@core/modules";

const Carpool = mongoose.model('Carpool');

exports.register = function (server, options, next) {
    const serverRouter = new ServerRouter(server);
    const cmsRoutes = new Routes(server);
    cmsRoutes.resources(ResourcesController, 'carpools', Carpool);

    serverRouter.resources('carpools', ApiCarpoolsController, {}, {
        auth: {
            strategy: 'jwt'
        }
    })
        .member('connected')
        .member('mine')
        .member('{id}/join', {
            method: 'GET',
            action: 'join'
        })
        .member('{id}/leave', {
            method: 'GET',
            action: 'leave'
        });

    serverRouter.resources('di-chung-xe', CarpoolsController, {
        only: ['index']
    });
};

exports.register.attributes = {
    name: 'carpool'
};
