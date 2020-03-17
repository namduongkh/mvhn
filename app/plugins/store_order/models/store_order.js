'use strict';

var mongoose = require('mongoose'),
  _ = require('lodash'),
  Schema = mongoose.Schema;

var Schema = new Schema({
  orderName: {
    type: String,
    required: true
  },
  store: {
    type: Schema.Types.ObjectId,
    ref: 'Store'
  },
  storeTable: {
    type: Schema.Types.ObjectId,
    ref: 'StoreTable'
  },
  storeOrderItems: [{
    type: Schema.Types.ObjectId,
    ref: 'StoreOrderItem'
  }],
  customer: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  total: {
    type: Number
  },
  reduceTotal: {
    type: Number
  },
  deliveryPeople: {
    type: String
  },
  deliveryPhone: {
    type: String
  },
  deliveryAddress: {
    type: String
  },
  note: {
    type: String
  },
  orderStatus: {
    type: String,
    enum: [
      'ordering',
      'ordered',
      'active',
      'ready',
      'delivering',
      'delivered',
      'done',
      'cancel'
    ],
    default: 'active'
  },
  type: {
    type: String,
    enum: [
      'single',
      'multiple'
    ],
    default: 'single'
  },
  paymentMethod: {
    type: String,
    enum: ['COD'],
    default: 'COD'
  },
  voucher: {
    type: Schema.Types.ObjectId,
    ref: 'StoreVoucher'
  },
  voucherCode: {
    type: String
  },
  status: {
    type: Number,
    default: 1
  }
}, {
  timestamps: true,
  collection: 'store_orders'
});

Schema.methods.applyVoucher = async function (voucherCode, division = 1) {
  const StoreVoucher = mongoose.model('StoreVoucher');
  let voucher = await StoreVoucher.findOne({ code: voucherCode });

  if (!voucher) return;

  if (await voucher.availableWith(this._id)) {
    this.reduceTotal = await voucher.reduce(this.total, division);
    this.voucher = voucher._id;
    this.voucherCode = voucher.code;

    voucher.quantity -= 1;
    voucher.appliedOrders = voucher.appliedOrders.concat([this._id]);
    await voucher.save();

    await this.save();
  }
}

Schema.methods.splitOrder = async function () {
  const StoreOrderItem = mongoose.model('StoreOrderItem');
  const StoreOrder = mongoose.model('StoreOrder');

  let newOrders = {};
  let storeItems = await StoreOrderItem.find({ storeOrder: this._id }).populate({ path: 'storeMenu', select: 'store' });

  for (let i in storeItems) {
    let item = storeItems[i];
    let storeId = item.storeMenu.store;
    newOrders[storeId] = newOrders[storeId] || new StoreOrder({
      store: storeId,
      ..._.pick(this, ['orderName', 'customer', 'deliveryPeople', 'deliveryAddress', 'deliveryPhone', 'note', 'orderStatus', 'type', 'paymentMethod', 'voucher', 'voucherCode']),
      storeOrderItems: [],
      total: 0
    });

    item = _.extend(item, { store: storeId, storeOrder: newOrders[storeId]._id });
    item.save();

    newOrders[storeId].total += item.total;
    newOrders[storeId].storeOrderItems.push(item._id);
  }

  for (let i in newOrders) {
    if (newOrders[i].voucherCode) {
      await newOrders[i].applyVoucher(newOrders[i].voucherCode, _.keys(newOrders).length)
    } else {
      await newOrders[i].save();
    }
  }

  await this.remove();
}

module.exports = mongoose.model('StoreOrder', Schema);
