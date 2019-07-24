'use strict';

import mongoose from 'mongoose';
import StoreTablesController from './controllers/store_tables.controller.js';
const StoreTable = mongoose.model('StoreTable');

exports.register = function (server, options, next) {
    const routes = new Routes(server);
    routes.resources(ResourcesController, 'store_tables', StoreTable);

    // server.route({
    //     method: 'GET',
    //     path: '/store_tables',
    //     config: new StoreTablesController('example').routeConfig()
    // })
};

exports.register.attributes = {
    name: 'store_table'
};