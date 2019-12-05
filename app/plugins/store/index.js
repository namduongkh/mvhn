'use strict';

import mongoose from 'mongoose';
import StoresController from './controllers/stores.controller.js';
import CmsStoresController from './controllers/cms_stores.controller.js';
const Store = mongoose.model('Store');

exports.register = function (server, options, next) {
    const routes = new Routes(server);
    routes.resources(CmsStoresController, 'stores', Store);

    server.route({
        method: 'GET',
        path: '/stores/{slug}',
        config: new StoresController('storeDetail').routeConfig()
    })
};

exports.register.attributes = {
    name: 'store'
};
