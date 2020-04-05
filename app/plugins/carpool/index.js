'use strict';

import mongoose from 'mongoose';
import CarpoolsController from './controllers/carpools_controller.js';
import ApiCarpoolsController from './controllers/api_carpools_controller.js';
const Carpool = mongoose.model('Carpool');

exports.register = function (server, options, next) {
    const serverRouter = new ServerRouter(server);
    const cmsRoutes = new Routes(server);
    cmsRoutes.resources(ResourcesController, 'carpools', Carpool);

    serverRouter.resources('carpools', ApiCarpoolsController);

    serverRouter.resources('di-chung-xe', CarpoolsController, {
        only: ['index']
    });
};

exports.register.attributes = {
    name: 'carpool'
};
