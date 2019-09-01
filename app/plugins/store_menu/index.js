'use strict';

import mongoose from 'mongoose';
import StoreMenusController from './controllers/store_menus.controller.js';
const StoreMenu = mongoose.model('StoreMenu');

exports.register = function (server, options, next) {
    const routes = new Routes(server);
    routes.resources(ResourcesController, 'store_menus', StoreMenu);

    server.route({
        method: 'GET',
        path: '/stores/{storeId}/store_menus',
        config: new StoreMenusController('index').routeConfig()
    })
};

exports.register.attributes = {
    name: 'store_menu',
    dependencies: 'store'
};