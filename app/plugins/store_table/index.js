'use strict';

import mongoose from 'mongoose';
import StoreTablesController from './controllers/store_tables.controller.js';
import CmsStoreTablesController from './controllers/cms_store_tables_controller.js';
import { ServerRouter, Routes, ResourcesController } from "@core/modules";

const StoreTable = mongoose.model('StoreTable');

exports.register = function (server, options, next) {
    const cmsRoutes = new Routes(server);
    cmsRoutes.resources(CmsStoreTablesController, 'store_tables', StoreTable);
    cmsRoutes.customRoute('POST', '{id}/move', CmsStoreTablesController, 'move', StoreTable);

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
