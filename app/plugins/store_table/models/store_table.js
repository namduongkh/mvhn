'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var Schema = new Schema({
  name: {
    type: String,
    trim: true,
    require: true
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

module.exports = mongoose.model('StoreTable', Schema);
