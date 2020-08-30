'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
import moment from "moment";

var Schema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  description: {
    type: String
  },
  store: {
    type: Schema.Types.ObjectId,
    ref: 'Store'
  },
  activeOrder: {
    type: Schema.Types.ObjectId,
    ref: 'StoreOrder'
  },
  status: {
    type: Number,
    default: 1
  }
}, {
  timestamps: true,
  collection: 'store_tables'
});

Schema.statics.unactiveOrder = async function (id) {
  const StoreTable = mongoose.model('StoreTable');

  let storeTable = await StoreTable.findById(id);
  storeTable.activeOrder = null;
  storeTable.save();
}

Schema.statics.cleanAndFindByStoreId = async function (storeId) {
  const StoreTable = mongoose.model('StoreTable');
  const StoreOrder = mongoose.model('StoreOrder');

  let storeTables = await StoreTable.find({ store: storeId });

  for (let storeTable of storeTables) {
    let { activeOrder } = storeTable;

    if (activeOrder) {
      let order = await StoreOrder.findById(activeOrder);

      if (!order || (order && !order.storeOrderItems.length && moment().diff(order.createdAt, 'minutes') > 5)) {
        if (order) order.remove();

        storeTable.activeOrder = null;
        await storeTable.save();
      } else {
        storeTable.activeOrder = order;
      }
    } else {
      StoreOrder.removeByStoreTableId(storeTable._id);
    }
  }

  return storeTables;
}

Schema.methods.move = async function (targetTableId) {
  const StoreOrder = mongoose.model('StoreOrder');
  const StoreTable = mongoose.model('StoreTable');

  let storeOrder = await StoreOrder.findById(this.activeOrder).populate('customer', 'name');
  let targetTable = await StoreTable.findById(targetTableId).populate('store', 'name');

  storeOrder.storeTable = targetTable._id;
  storeOrder.orderName = `${storeOrder.customer.name} - ${targetTable.name} - ${targetTable.store.name}`;

  targetTable.activeOrder = storeOrder._id;

  this.activeOrder = null;

  await storeOrder.save();
  await targetTable.save();
  return await this.save();
}

module.exports = mongoose.model('StoreTable', Schema);
