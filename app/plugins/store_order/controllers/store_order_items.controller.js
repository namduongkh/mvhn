'use strict';

import mongoose from "mongoose";
import _ from "lodash";

const StoreOrder = mongoose.model('StoreOrder');
const StoreOrderItem = mongoose.model('StoreOrderItem');

export default class StoreOrderItemsController extends BaseController {

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
}
