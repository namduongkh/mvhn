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
    type: String,
  },
  address: {
    type: String,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  status: {
    type: Number,
    default: 1
  }
}, {
    timestamps: true,
    collection: 'stores'
  });

module.exports = mongoose.model('Store', Schema);
