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
  paymentMethod: {
    type: String,
    enum: ['COD'],
    default: 'COD'
  },
  status: {
    type: Number,
    default: 1
  }
}, {
  timestamps: true,
  collection: 'store_orders'
});

module.exports = mongoose.model('StoreOrder', Schema);
