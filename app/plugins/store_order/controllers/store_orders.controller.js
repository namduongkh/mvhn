'use strict';

import mongoose from "mongoose";
import _ from "lodash";
import UserMiddleware from "../../user/middleware/user";

const StoreOrder = mongoose.model('StoreOrder');
const StoreOrderItem = mongoose.model('StoreOrderItem');
const User = mongoose.model('User');

export default class StoreOrdersController extends BaseController {

  // beforeActions() {
  //   return {
  //     loadAuthUser: [["index", "authUser"]]
  //   }
  // }

  async index() {
    let { credentials } = this.request.auth;
    let { page } = this.request.query;
    let itemsPerPage = 10;
    page = page || 1;

    let orders = StoreOrder.find({
      customer: credentials.uid,
      orderStatus: { $nin: ['ordering'] },
      status: 1
    })
      .sort('-createdAt')
      .populate('store', 'name logo')
      .populate({
        path: 'storeOrderItems',
        select: 'storeMenu',
        populate: {
          path: 'storeMenu',
          select: 'name image'
        }
      })
      .skip((page - 1) * itemsPerPage)
      .limit(itemsPerPage)
      .lean();

    return orders;
  }

  async update() {
    let { orderStatus } = this.request.payload;
    if (orderStatus == 'ordered') {
      this.request.payload.createdAt = Date.now();
    }
    let resp = await new ResourcesController(StoreOrder, this.request, this.h).update();
    return resp;
  }

  async ordering() {
    let { credentials } = this.request.auth;
    let { store } = this.request.query;
    let user = await User.findOne({ _id: credentials.uid }, 'name phone address').lean();

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
      orderName: `${credentials.name}'s order`
    })).save();

    order = _.merge({
      deliveryPeople: user.name,
      deliveryPhone: user.phone,
      deliveryAddress: user.address
    }, JSON.parse(JSON.stringify(order)));

    return order;
  }

  // async loadAuthUser() {
  //   let middleware = new UserMiddleware(this.request.server);
  //   return await middleware.authUser(this.request, this.h);
  // }
}
