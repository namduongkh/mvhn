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
  total: {
    type: Number
  },
  orderStatus: {
    type: String,
    enum: [
      'active',
      'done'
    ],
    default: 'active'
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
