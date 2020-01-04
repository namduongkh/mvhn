'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var Schema = new Schema({
  from: {
    name: { type: String },
    address: { type: String }
  },
  to: [{
    name: { type: String },
    address: { type: String }
  }],
  cc: [{
    name: { type: String },
    address: { type: String }
  }],
  bcc: [{
    name: { type: String },
    address: { type: String }
  }],
  subject: {
    type: String
  },
  content: {
    type: String
  },
  context: {},
  transferStatus: {
    type: String,
    default: 'pending'
  },
  status: {
    type: Number,
    default: 1
  }
}, {
  timestamps: true,
  collection: 'email_queues'
});

module.exports = mongoose.model('EmailQueue', Schema);
