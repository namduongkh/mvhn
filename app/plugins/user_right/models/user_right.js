'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var Schema = new Schema({
  group: {
    type: Schema.Types.ObjectId,
    ref: 'UserGroup',
    require: true
  },
  action: {
    type: String,
    require: true
  },
  allowed: {
    type: Boolean,
    require: true
  }
}, {
    timestamps: true,
    collection: 'user_rights'
  });

module.exports = mongoose.model('UserRight', Schema);
