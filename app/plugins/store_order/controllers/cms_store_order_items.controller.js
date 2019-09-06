'use strict';

import mongoose from "mongoose";
import _ from "lodash";

const StoreOrder = mongoose.model('StoreOrder');
const StoreOrderItem = mongoose.model('StoreOrderItem');

export default class CmsStoreOrderItemsController extends ResourcesController {
  async index() {
    let storeOrder = this.request.query.storeOrder || this.request.params.storeOrder;
    if (!storeOrder) {
      return { status: false, data: [], message: "Provide Store Table" }
    }
    return await super.index();
  }

  async update() {
    let resp = await super.update();
    let item = resp.data;
    if (item.itemStatus == 'ready') {
      await this.checkOrderIsReady(item.storeOrder);
    }
    return resp;
  }

  async checkOrderIsReady(storeOrderId) {
    let order = await StoreOrder.findOne({ _id: storeOrderId });
    let items = await StoreOrderItem.find({
      _id: { $in: order.storeOrderItems },
      status: 1,
      itemStatus: 'ready'
    }).lean();
    if (items.length == order.storeOrderItems.length) {
      order.orderStatus = 'ready';
      await order.save();
    }
  }
}
