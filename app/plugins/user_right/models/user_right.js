'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  controller: {
    type: String,
    required: true
  },
  action: {
    type: String,
    required: true
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
