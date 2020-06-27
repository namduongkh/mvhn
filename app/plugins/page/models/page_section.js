'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var Schema = new Schema({
  page: {
    type: Schema.Types.ObjectId,
    ref: 'Page'
  },
  title: {
    type: String
  },
  html: {
    type: String
  },
  css: {
    type: String
  },
  order: {
    type: Number,
    default: 1
  },
  status: {
    type: Number,
    default: 1
  }
}, {
  timestamps: true,
  collection: 'page_sections'
});

module.exports = mongoose.model('PageSection', Schema);
