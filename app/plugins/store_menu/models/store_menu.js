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
  image: {
    type: String
  },
  price: {
    type: Number,
    default: 0
  },
  store: {
    type: Schema.Types.ObjectId,
    ref: 'Store'
  },
  status: {
    type: Number,
    default: 1
  }
}, {
  timestamps: true,
  collection: 'store_menus'
});

module.exports = mongoose.model('StoreMenu', Schema);
