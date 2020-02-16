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
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  orderer: {
    type: String
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
    // enum: [
    //   'ordering',
    //   'ordered',
    //   'active',
    //   'ready',
    //   'delivering',
    //   'delivered',
    //   'done',
    //   'cancel'
    // ],
    default: 'active'
  },
  startTime: {
    type: Date
  },
  endTime: {
    type: Date
  },
  type: {
    type: String,
    enum: [
      'sale',
      'service'
    ],
    default: 'sale'
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
