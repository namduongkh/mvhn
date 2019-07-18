'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var Schema = new Schema({
  name: {
    type: String,
    require: true
  },
  controller: {
    type: String,
    require: true
  },
  action: {
    type: String,
    require: true
  },
  status: {
    type: Number,
    default: 1
  }
}, {
    timestamps: true,
    collection: 'user_rights'
  });

module.exports = mongoose.model('UserRight', Schema);
