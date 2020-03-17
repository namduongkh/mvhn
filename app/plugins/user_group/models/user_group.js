'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var Schema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  slug: {
    type: String,
    unique: true
  },
  status: {
    type: Number,
    default: 1
  },
  allowedRights: [{
    type: Schema.Types.ObjectId,
    ref: 'UserRight'
  }],
  accessItself: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true,
  collection: 'user_groups'
});

module.exports = mongoose.model('UserGroup', Schema);
