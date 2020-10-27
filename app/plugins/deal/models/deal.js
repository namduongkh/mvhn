'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var Schema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  winOption: {
    type: Schema.Types.ObjectId,
    ref: 'DealOption'
  },
  from: {
    type: Date
  },
  to: {
    type: Date
  },
  stop: {
    type: Boolean,
    default: false
  },
  status: {
    type: Number,
    default: 1
  }
}, {
  timestamps: true,
  collection: 'deals'
});

module.exports = mongoose.model('Deal', Schema);
