'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var Schema = new Schema({
  objectType: {
    type: String,
    trim: true,
    require: true
  },
  objectId: {
    type: String,
    trim: true,
    require: true
  },
  version: {
    type: Number,
    default: 1
  },
  changes: {
    type: Schema.Types.Mixed
  },
  status: {
    type: Number,
    default: 1
  }
}, {
  timestamps: true,
  collection: 'audit_logs'
});

module.exports = mongoose.model('AuditLog', Schema);
