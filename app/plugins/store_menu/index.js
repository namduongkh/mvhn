'use strict';

import mongoose from 'mongoose';
import StoreMenusController from './controllers/store_menus.controller.js';
import CmsStoreMenusController from './controllers/cms_store_menus_controller.js';
import { ServerRouter, Routes, ResourcesController } from "@core/modules";

const StoreMenu = mongoose.model('StoreMenu');

exports.register = function (server, options, next) {
    const routes = new Routes(server);
    routes.resources(CmsStoreMenusController, 'store_menus', StoreMenu);

    let serverRouter = new ServerRouter(server);
    serverRouter.resources('stores/{storeId}/store_menus', StoreMenusController, {
        only: ['index']
    }).member('get_from_product', {
        method: 'GET',
        action: 'getFromProduct'
    });
};

exports.register.attributes = {
    name: 'store_menu',
    dependencies: 'store'
};
