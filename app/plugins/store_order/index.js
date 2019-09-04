'use strict';

import mongoose from 'mongoose';
import StoreOrdersController from './controllers/store_orders.controller.js';
import StoreOrderItemsController from './controllers/store_order_items.controller.js';
import CmsStoreOrdersController from './controllers/cms_store_orders.controller.js';
import CmsStoreOrderItemsController from './controllers/cms_store_order_items.controller.js';
const StoreOrder = mongoose.model('StoreOrder');
const StoreOrderItem = mongoose.model('StoreOrderItem');

exports.register = function (server, options, next) {
    const routes = new Routes(server);
    routes.resources(CmsStoreOrdersController, 'store_orders', StoreOrder);
    routes.resources(CmsStoreOrderItemsController, 'store_order_items', StoreOrderItem);

    const serverRouter = new ServerRouter(server);

    serverRouter.resources('store_orders', StoreOrdersController, {
        only: ['update']
    }, {
            auth: 'jwt'
        }).member('ordering');

    serverRouter.resources('store_order_items', StoreOrderItemsController, {
        only: []
    }, {
            auth: 'jwt'
        }).member('bulkCreate', 'POST');
};

exports.register.attributes = {
    name: 'store_order',
    dependencies: 'store'
};