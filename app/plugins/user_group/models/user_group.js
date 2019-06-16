'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var Schema = new Schema({
  name: {
    type: String,
    trim: true,
    require: true
  },
  status: {
    type: Number,
    default: 1
  }
}, {
    timestamps: true,
    collection: 'user_groups'
  });

module.exports = mongoose.model('UserGroup', Schema);
