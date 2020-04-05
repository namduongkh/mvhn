'use strict';

import mongoose from 'mongoose';
import CarpoolsController from './controllers/carpools_controller.js';
const Carpool = mongoose.model('Carpool');

exports.register = function (server, options, next) {
    const serverRouter = new ServerRouter(server);
    const cmsRoutes = new Routes(server);
    cmsRoutes.resources(ResourcesController, 'carpools', Carpool);

    serverRouter.resources('carpools', CarpoolsController, {
        only: ['index']
    });
};

exports.register.attributes = {
    name: 'carpool'
};
