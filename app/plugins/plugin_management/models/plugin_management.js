'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var Schema = new Schema({
  pluginName: {
    type: String,
    trim: true,
    require: true,
    unique: true
  },
  pluginVersion: {
    type: String
  },
  enabled: {
    type: Boolean,
    default: false
  },
  cmsOrder: {
    type: Number,
    default: 0
  },
  status: {
    type: Number,
    default: 1
  }
}, {
    timestamps: true,
    collection: 'plugin_managements'
  });

module.exports = mongoose.model('PluginManagement', Schema);
