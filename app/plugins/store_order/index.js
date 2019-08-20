'use strict';

import mongoose from 'mongoose';
import StoreOrdersController from './controllers/store_orders.controller.js';
import CmsStoreOrdersController from './controllers/cms_store_orders.controller.js';
import CmsStoreOrderItemsController from './controllers/cms_store_order_items.controller.js';
const StoreOrder = mongoose.model('StoreOrder');
const StoreOrderItem = mongoose.model('StoreOrderItem');

exports.register = function (server, options, next) {
    const routes = new Routes(server);
    routes.resources(CmsStoreOrdersController, 'store_orders', StoreOrder);
    routes.resources(CmsStoreOrderItemsController, 'store_order_items', StoreOrderItem);

    // server.route({
    //     method: 'GET',
    //     path: '/store_orders',
    //     config: new StoreOrdersController('example').routeConfig()
    // })
};

exports.register.attributes = {
    name: 'store_order',
    dependencies: 'store'
};