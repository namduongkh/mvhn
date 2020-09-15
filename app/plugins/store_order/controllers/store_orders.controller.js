'use strict';

import moment from "moment";
import mongoose from "mongoose";
import _ from "lodash";
import UserMiddleware from "../../user/middleware/user";
import Boom from "boom";
import CmsStoreOrdersController from "./cms_store_orders.controller";
import { BaseController } from "@core/modules";
import { ResourcesController } from "@core/modules";

const StoreOrder = mongoose.model('StoreOrder');
const StoreOrderItem = mongoose.model('StoreOrderItem');
const Store = mongoose.model('Store');
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

    let orders = await StoreOrder.find({
      customer: credentials.uid,
      $or: [{
        orderStatus: { $nin: ['ordering'] }
      }, {
        type: 'multiple'
      }],
      status: 1,
      store: { $ne: null }
    })
      .sort('-createdAt')
      .populate('store', 'name logo slug')
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

  async create() {
    let resources = new CmsStoreOrdersController(StoreOrder, this.request, this.h);
    return await resources.create();
  }

  async show() {
    let storeOrder = await StoreOrder.findById(this.request.params.id).lean();
    if (!storeOrder) throw Boom.notFound();

    let store = await Store.findById(storeOrder.store).lean();
    let customer = await User.findById(storeOrder.customer).lean();

    if (this.request.headers.accept.includes('application/json')) {
      return storeOrder;
    }

    return this.h.view('store_order/views/show.html', {
      store,
      storeOrder,
      customer,
      meta: {
        title: `${storeOrder.orderName} - ${customer.name} - ${store.name}`
      },
    });
  }

  async update() {
    let { orderStatus } = this.request.payload;
    if (orderStatus == 'ordered') {
      this.request.payload.createdAt = Date.now();
    }
    let resp = await new ResourcesController(StoreOrder, this.request, this.h).update();
    let order = resp.data;
    if (order.orderStatus == 'ordered') {
      this.notifyToOwner();
      User.findById(order.customer).then((user) => {
        user.notify(`Đã đặt hàng thành công`);
      });
    }
    if (order.voucherCode) {
      await order.applyVoucher(order.voucherCode);
    }
    if (!order.store) {
      await order.splitOrder();
    }
    return resp;
  }

  async ordering() {
    let { credentials } = this.request.auth;
    let { store, storeOrder } = this.request.query;
    let user = await User.findOne({ _id: credentials.uid }, 'name phone address').lean();

    if (storeOrder) {
      let order = await StoreOrder.findOne({
        _id: storeOrder,
        status: 1,
        customer: credentials.uid
      }).populate({
        path: 'storeOrderItems',
        populate: {
          path: 'storeMenu',
          select: 'name image'
        }
      }).lean();

      if (!order) throw Boom.notFound();

      return order;
    } else {
      let activeData = {
        status: 1,
        orderStatus: 'ordering',
        customer: credentials.uid,
        type: 'single',
        storeTable: null
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
  }

  // async loadAuthUser() {
  //   let middleware = new UserMiddleware(this.request.server);
  //   return await middleware.authUser(this.request, this.h);
  // }

  async notifyToOwner() {
    let order = await StoreOrder.findById(this.request.params.id).populate({
      path: 'store',
      select: 'owner',
      populate: [{
        path: 'owner',
        select: 'name email'
      }]
    }).populate({
      path: 'customer',
      select: 'name'
    });

    let { EmailSender } = this.request.server.plugins['email_queue'];

    if (!order.store) return;

    User.findById(order.store.owner._id).then((user) => {
      user.notify(`Đơn hàng mới được đặt`);
    });

    await (new EmailSender(this.request.server, {
      to: [{
        name: order.store.owner.name,
        address: order.store.owner.email
      }],
      subject: `[Đơn hàng mới] ${order.orderName}`,
      content: `
        <b>${order.customer.name}</b> vừa tiến hành đặt hàng vào lúc ${moment(order.createdAt).format('DD/MM/YYYY HH:mm')}.<br/>
        Kiểm tra ngay tại
        <a href="${this.request.server.configManager.get('web.context.settings.services.webUrl')}${this.request.server.configManager.get('web.context.settings.services.cmsUrl')}">
          Saler Portal
        </a>.`
    })).perform();
  }
}
