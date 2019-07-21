'use strict';

import mongoose from 'mongoose';
import StoresController from './controllers/stores.controller.js';
import CmsStoresController from './controllers/cms_stores.controller.js';
const Store = mongoose.model('Store');

exports.register = function (server, options, next) {
    const routes = new Routes(server);
    routes.resources(CmsStoresController, 'stores', Store);
    routes.customRoute('GET', 'stores/mystore', CmsStoresController, 'mystore', Store);

    // server.route({
    //     method: 'GET',
    //     path: '/stores',
    //     config: new StoresController('example').routeConfig()
    // })
};

exports.register.attributes = {
    name: 'store'
};