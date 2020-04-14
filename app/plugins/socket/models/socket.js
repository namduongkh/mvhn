'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  classname: {
    type: String,
    required: true
  },
  status: {
    type: Number,
    default: 1
  }
}, {
  timestamps: true,
  collection: 'sockets'
});

module.exports = mongoose.model('Socket', Schema);
