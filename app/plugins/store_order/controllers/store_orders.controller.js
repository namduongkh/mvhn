'use strict';

import moment from "moment";
import mongoose from "mongoose";
import _ from "lodash";
import UserMiddleware from "../../user/middleware/user";
import Boom from "boom";
import CmsStoreOrdersController from "./cms_store_orders.controller";

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

    let orders = StoreOrder.find({
      customer: credentials.uid,
      $or: [{
        orderStatus: { $nin: ['ordering'] }
      }, {
        type: 'multiple'
      }],
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
      registerLazyMode: true
    });
  }

  async update() {
    let { orderStatus } = this.request.payload;
    if (orderStatus == 'ordered') {
      this.request.payload.createdAt = Date.now();
      this.sendEmail();
    }
    let resp = await new ResourcesController(StoreOrder, this.request, this.h).update();
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
  }

  // async loadAuthUser() {
  //   let middleware = new UserMiddleware(this.request.server);
  //   return await middleware.authUser(this.request, this.h);
  // }

  async sendEmail() {
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
