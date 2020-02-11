'use strict';

import mongoose from "mongoose";
import _ from "lodash";
import CmsStoreOrderItemsController from "./cms_store_order_items.controller";
import Boom from "boom";

const StoreOrder = mongoose.model('StoreOrder');
const StoreOrderItem = mongoose.model('StoreOrderItem');

export default class StoreOrderItemsController extends BaseController {

  beforeActions() {
    return {
      loadOrder: [["create", "update", "delete"]],
    }
  }

  async index() {
    let resources = new CmsStoreOrderItemsController(StoreOrderItem, this.request, this.h);
    return await resources.index();
  }

  async create() {
    let resources = new CmsStoreOrderItemsController(StoreOrderItem, this.request, this.h);
    return await resources.create();
  }

  async update() {
    let resources = new CmsStoreOrderItemsController(StoreOrderItem, this.request, this.h);
    return await resources.update();
  }

  async delete() {
    let resources = new CmsStoreOrderItemsController(StoreOrderItem, this.request, this.h);
    return await resources.delete();
  }

  async bulkCreate() {
    let { storeOrderId, storeOrderItems } = this.request.payload;

    await StoreOrderItem.remove({
      storeOrder: { $in: storeOrderId }
    }, function () { });

    let storeOrderItemIds = [];
    for (let i in storeOrderItems) {
      let item = storeOrderItems[i];
      let storeOrderItem = await (new StoreOrderItem(item)).save();
      storeOrderItemIds.push(storeOrderItem._id);
    }
    return storeOrderItemIds;
  }

  async loadOrder() {
    try {
      let orderItem = this.request.params && this.request.params.id ? await StoreOrderItem.findById(this.request.params.id).lean() : {};
      let order = await StoreOrder.findById((this.request.payload && this.request.payload.storeOrder) || orderItem.storeOrder);

      if (!order || order.orderStatus != 'ordering') {
        throw Boom.badRequest('Can not update order');
      }
    } catch  {
      throw Boom.badRequest('Can not update order');
    }
  }
}
