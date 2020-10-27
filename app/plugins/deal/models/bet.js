'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var Schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  deal: {
    type: Schema.Types.ObjectId,
    ref: 'Deal'
  },
  option: {
    type: Schema.Types.ObjectId,
    ref: 'DealOption'
  },
  win: {
    type: Boolean
  },
  amount: {
    type: Number
  },
  status: {
    type: Number,
    default: 1
  }
}, {
  timestamps: true,
  collection: 'bets'
});

module.exports = mongoose.model('Bet', Schema);
