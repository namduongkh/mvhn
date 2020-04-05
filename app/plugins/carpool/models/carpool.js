'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var Schema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  fromPlace: {
    type: Schema.ObjectId,
    ref: 'Place'
  },
  toPlace: {
    type: Schema.ObjectId,
    ref: 'Place'
  },
  time: {
    type: Date
  },
  description: {
    type: String
  },
  status: {
    type: Number,
    default: 1
  }
}, {
  timestamps: true,
  collection: 'carpools'
});

module.exports = mongoose.model('Carpool', Schema);
