'use strict';

import mongoose from 'mongoose';
import StoresController from './controllers/stores.controller.js';
const Store = mongoose.model('Store');

exports.register = function (server, options, next) {
    const routes = new Routes(server);
    routes.resources(ResourcesController, 'stores', Store);

    // server.route({
    //     method: 'GET',
    //     path: '/stores',
    //     config: new StoresController('example').routeConfig()
    // })
};

exports.register.attributes = {
    name: 'store'
};