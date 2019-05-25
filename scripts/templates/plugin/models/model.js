'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var Schema = new Schema({
  attributeName: {
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
    collection: '<%= collectionName %>'
  });

module.exports = mongoose.model('<%= modelName %>', Schema);
