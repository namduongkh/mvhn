'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var Schema = new Schema({
  orderName: {
    type: String,
    require: true
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

Schema.methods.applyVoucher = async function (voucherCode) {
  const StoreVoucher = mongoose.model('StoreVoucher');
  let voucher = await StoreVoucher.findOne({ code: voucherCode });

  if (!voucher) return;

  if (await voucher.availableWith(this._id)) {
    this.total = await voucher.reduce(this.total);
    this.voucher = voucher._id;
    this.voucherCode = voucher.code;

    voucher.quantity -= 1;
    voucher.appliedOrders = voucher.appliedOrders.concat([this._id]);
    await voucher.save();

    await this.save();
  }
}

module.exports = mongoose.model('StoreOrder', Schema);
