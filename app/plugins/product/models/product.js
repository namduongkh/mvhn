'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var Schema = new Schema({
  name: {
    type: String,
    trim: true,
    require: true
  },
  slug: {
    type: String,
    trim: true,
    require: true,
    unique: true
  },
  urls: [{
    name: { type: String },
    path: { type: String }
  }],
  thumb: {
    type: String,
    require: true
  },
  content: {
    type: String
  },
  price: {
    type: Number,
    default: 0
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Property'
  },
  tags: [{
    type: Schema.Types.ObjectId,
    ref: 'Property'
  }],
  status: {
    type: Number,
    default: 1
  }
}, {
    timestamps: true,
    collection: 'products'
  });

module.exports = mongoose.model('Product', Schema);
