'use strict';

import mongoose from 'mongoose';
import StoresController from './controllers/stores.controller.js';
const Store = mongoose.model('Store');

exports.register = function (server, options, next) {
    const routes = new Routes(server);
    routes.resources(ResourcesController, 'stores', Store);

    const serverRouter = new ServerRouter(server);

    serverRouter.resources('stores', StoresController, {
        only: ['show']
    });
};

exports.register.attributes = {
    name: 'store'
};
