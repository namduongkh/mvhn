'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var Schema = new Schema({
  store: {
    type: Schema.Types.ObjectId,
    ref: 'Store',
    require: true
  },
  storeOrder: {
    type: Schema.Types.ObjectId,
    ref: 'StoreOrder',
    require: true
  },
  storeMenu: {
    type: Schema.Types.ObjectId,
    ref: 'StoreMenu',
    require: true
  },
  price: {
    type: Number,
    default: 0
  },
  note: {
    type: String
  },
  quantity: {
    type: Number,
    default: 1
  },
  total: {
    type: Number
  },
  itemStatus: {
    type: String,
    enum: [
      'ordering',
      'preparing',
      'ready',
      'delivered',
      'done'
    ],
    default: 'preparing'
  },
  status: {
    type: Number,
    default: 1
  }
}, {
    timestamps: true,
    collection: 'store_order_items'
  });

module.exports = mongoose.model('StoreOrderItem', Schema);
