'use strict';

import mongoose from 'mongoose';
import StoreOrdersController from './controllers/store_orders.controller.js';
import StoreOrderItemsController from './controllers/store_order_items.controller.js';
import CmsStoreOrdersController from './controllers/cms_store_orders.controller.js';
import CmsStoreOrderItemsController from './controllers/cms_store_order_items.controller.js';
import { ServerRouter, Routes, ResourcesController } from "@core/modules";

const StoreOrder = mongoose.model('StoreOrder');
const StoreOrderItem = mongoose.model('StoreOrderItem');

exports.register = function (server, options, next) {
  new Routes(server, null, {
    parentObjectConfig: {
      param: 'storeId',
      model: 'Store',
      attribute: 'store'
    }
  }).resources(CmsStoreOrdersController, 'stores/{storeId}/store_orders', StoreOrder);

  new Routes(server, null, {
    parentObjectConfig: {
      param: 'storeTableId',
      model: 'StoreTable',
      attribute: 'storeTable'
    }
  }).resources(CmsStoreOrdersController, 'store_tables/{storeTableId}/store_orders', StoreOrder);

  new Routes(server).resources(CmsStoreOrderItemsController, 'store_order_items', StoreOrderItem);

  const serverRouter = new ServerRouter(server);

  serverRouter.resources('store_orders', StoreOrdersController, {
    only: ['index', 'update', 'create']
  }, {
    auth: 'jwt'
  }).member('ordering');
  serverRouter.resources('store_orders', StoreOrdersController, {
    only: ['show']
  });

  serverRouter.resources('store_order_items', StoreOrderItemsController, {
    only: ['index', 'create', 'update', 'delete']
  }, {
    auth: 'jwt'
  }).member('bulkCreate', 'POST');
};

exports.register.attributes = {
  name: 'store_order',
  dependencies: 'store'
};
