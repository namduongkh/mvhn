'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var Schema = new Schema({
  title: {
    type: String,
    trim: true,
    require: true
  },
  url: {
    type: String,
    trim: true,
    require: true
  },
  external: {
    type: Boolean,
    default: false
  },
  status: {
    type: Number,
    default: 1
  }
}, {
    timestamps: true,
    collection: 'links'
  });

module.exports = mongoose.model('Link', Schema);
