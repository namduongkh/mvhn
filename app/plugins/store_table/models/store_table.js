'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

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

module.exports = mongoose.model('StoreTable', Schema);
