'use strict';

import mongoose from 'mongoose';
import StoreTablesController from './controllers/store_tables.controller.js';
const StoreTable = mongoose.model('StoreTable');

exports.register = function (server, options, next) {
    const routes = new Routes(server);
    routes.resources(ResourcesController, 'store_tables', StoreTable);

    const serverRouter = new ServerRouter(server);

    serverRouter.resources('stores/{storeId}/store_tables', StoreTablesController, {
        only: ['index', 'update']
    }, {
        auth: 'jwt'
    }).member('{id}/create_order', {
        method: 'GET',
        action: 'createOrder'
    });
    serverRouter.resources('store_tables', StoreTablesController, {
        only: ['show']
    });
};

exports.register.attributes = {
    name: 'store_table',
    dependencies: 'store'
};
