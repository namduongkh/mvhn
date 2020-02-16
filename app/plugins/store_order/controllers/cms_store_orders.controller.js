import mongoose from "mongoose";
import _ from "lodash";

const StoreTable = mongoose.model('StoreTable');
const StoreOrderItem = mongoose.model('StoreOrderItem');

export default class CmsStoreOrdersController extends ResourcesController {
  async index() {
    let storeTable = this.request.query.storeTableId || this.request.params.storeTableId;
    let store = this.request.query.storeId || this.request.params.storeId;

    if (!store && !storeTable) {
      return { status: false, data: [], message: "Provide Store ID or Store Table ID" }
    }

    this.request.query = _.extend({
      $or: [{
        orderStatus: { $nin: ['ordering'] }
      }, {
        type: 'multiple'
      }],
    }, this.request.query);

    this.request.query.populates = [{
      path: "storeOrderItems",
      select: "storeMenu quantity itemStatus",
      populate: {
        path: "storeMenu",
        select: "name"
      }
    }];

    return await super.index();
  }

  async new() {
    try {
      let object = new this.MODEL({}).toJSON();
      object.fakeId = object._id;
      delete object._id;
      return object;
    } catch (error) {
      console.log(error);
      throw Boom.badRequest('Something went wrong!');
    }
  }

  async create() {
    this.request.payload._id = this.request.payload.fakeId;
    delete this.request.payload.fakeId;
    let result = await super.create();
    this.setTableActiveOrder(result.data);
    return result;
  }

  async update() {
    let result = await super.update();
    if (result.data.orderStatus == 'done') {
      this.unsetTableActiveOrder(result.data);
      this.setDoneOrderItems(result.data);
    } else if (result.data.orderStatus == 'active') this.setTableActiveOrder(result.data);
    this.updateStoreOrderItemStatus(result.data)
    return result;
  }

  async setTableActiveOrder(order) {
    if (!order.storeTable) return;
    let storeTable = await this.loadStoreTable(order.storeTable);
    storeTable.activeOrder = order._id;
    return await storeTable.save();
  }

  async setDoneOrderItems(order) {
    return await StoreOrderItem.updateMany({
      storeOrder: order._id
    }, {
      itemStatus: 'done'
    });
  }

  async unsetTableActiveOrder(order) {
    if (!order.storeTable) return;
    let storeTable = await this.loadStoreTable(order.storeTable);
    storeTable.activeOrder = undefined;
    return await storeTable.save();
  }

  async loadStoreTable(_id) {
    return await StoreTable.findOne({ _id });
  }

  async updateStoreOrderItemStatus(order) {
    await StoreOrderItem.updateMany({
      storeOrder: order._id
    }, {
      itemStatus: order.orderStatus
    }, function () { });
  }
}
