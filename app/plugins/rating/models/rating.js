'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var Schema = new Schema({
  object: {
    type: String,
    require: true
  },
  star: {
    type: Number,
    require: true
  },
  comment: {
    type: String
  },
  guest: {
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
