'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var Schema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  rate: {
    type: Number,
    default: 1
  },
  deal: {
    type: Schema.Types.ObjectId,
    ref: 'Deal'
  },
  win: {
    type: Boolean,
    default: false
  },
  status: {
    type: Number,
    default: 1
  }
}, {
  timestamps: true,
  collection: 'deal_options'
});

module.exports = mongoose.model('DealOption', Schema);
