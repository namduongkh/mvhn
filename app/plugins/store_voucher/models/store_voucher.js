'use strict';

import _ from "lodash";

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const REDUCE_TYPE = {
  1: 'Amount',
  2: 'Percent'
}

const INVERT_REDUCE_TYPE = _.invert(REDUCE_TYPE)

var Schema = new Schema({
  name: {
    type: String,
    trim: true,
    require: true
  },
  code: {
    type: String,
    trim: true,
    require: true,
    unique: true
  },
  quantity: {
    type: Number,
    default: 0
  },
  reduceValue: {
    type: Number,
  },
  reduceType: {
    type: Number,
    enum: _.keys(REDUCE_TYPE),
    default: INVERT_REDUCE_TYPE['Amount']
  },
  appliedOrders: [{
    type: Schema.Types.ObjectId,
    ref: 'StoreOrder'
  }],
  status: {
    type: Number,
    default: 1
  }
}, {
  timestamps: true,
  collection: 'store_vouchers'
});

Schema.methods.reduce = async function (amount = 0) {
  if (!amount || !this.reduceValue) return amount;
  let remain;

  switch (this.reduceType) {
    case INVERT_REDUCE_TYPE['Amount']:
      remain = amount - this.reduceValue;
      return remain > 0 ? remain : 0;
    case INVERT_REDUCE_TYPE['Percent']:
      remain = amount * ((100 - this.reduceValue) / 100);
      return remain > 0 ? remain : 0;
  }
}

Schema.methods.availableWith = async function (storeOrderId) {
  return this.quantity > 0 && !this.appliedOrders.includes(storeOrderId);
}

module.exports = mongoose.model('StoreVoucher', Schema);
