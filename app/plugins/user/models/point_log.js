'use strict';

var mongoose = require('mongoose'),
  _ = require('lodash'),
  Schema = mongoose.Schema;

var Schema = new Schema({
  content: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  point: {
    type: Number
  },
  before: {
    type: Number
  },
  after: {
    type: Number
  },
  status: {
    type: Number,
    default: 1
  }
}, {
  timestamps: true,
  collection: 'point_logs'
});

module.exports = mongoose.model('PointLog', Schema);
