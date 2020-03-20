'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var Schema = new Schema({
  object: {
    type: String,
    required: true
  },
  star: {
    type: Number,
    required: true
  },
  comment: {
    type: String
  },
  guest: {
    type: String
  },
  additionalInfo: {
    type: String
  },
  avatar: {
    type: String
  },
  status: {
    type: Number,
    default: 1
  }
}, {
  timestamps: true,
  collection: 'ratings'
});

module.exports = mongoose.model('Rating', Schema);
