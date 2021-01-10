'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var Schema = new Schema({
  name: {
    type: String
  },
  store: {
    type: Schema.Types.ObjectId,
    ref: 'Store',
    required: true
  },
  storeOrder: {
    type: Schema.Types.ObjectId,
    ref: 'StoreOrder',
    required: true
  },
  storeMenu: {
    type: Schema.Types.ObjectId,
    ref: 'StoreMenu',
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

Schema.pre('validate', async function (next) {
  if (!this.store) {
    if (this.storeMenu) {
      const StoreMenu = mongoose.model('StoreMenu');
      this.store = (await StoreMenu.findById(this.storeMenu, 'store').lean()).store;
    } else if (this.storeOrder) {
      const StoreOrder = mongoose.model('StoreOrder');
      this.store = (await StoreOrder.findById(this.storeOrder, 'store').lean()).store;
    }
  }

  return next();
});

module.exports = mongoose.model('StoreOrderItem', Schema);
