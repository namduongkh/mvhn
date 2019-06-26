'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var Schema = new Schema({
  name: {
    type: String,
    trim: true,
    require: true
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
  // deniedRights: [{
  //   type: Schema.Types.ObjectId,
  //   ref: 'UserRight'
  // }]
}, {
    timestamps: true,
    collection: 'user_groups'
  });

module.exports = mongoose.model('UserGroup', Schema);
