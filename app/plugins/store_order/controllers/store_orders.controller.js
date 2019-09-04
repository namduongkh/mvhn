'use strict';

import mongoose from "mongoose";
import _ from "lodash";

const StoreOrder = mongoose.model('StoreOrder');

export default class StoreOrdersController extends BaseController {

  async update() {
    let resp = await new ResourcesController(StoreOrder, this.request, this.h).update();
    return resp;
  }

  async ordering() {
    let { credentials } = this.request.auth;
    let { store } = this.request.query;
    let activeData = {
      status: 1,
      orderStatus: 'ordering',
      customer: credentials.uid,
      store
    };
    let order = await StoreOrder.findOne(activeData).populate({
      path: 'storeOrderItems',
      populate: {
        path: 'storeMenu',
        select: 'name image'
      }
    }).lean() || await new StoreOrder(_.merge(activeData, {
      orderName: `${credentials.name} order`
    })).save();
    return order;
  }
}
