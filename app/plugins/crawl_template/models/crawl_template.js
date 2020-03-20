'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  urlPattern: {
    type: String,
    required: true
  },
  crawler: {
    type: Schema.Types.ObjectId,
    ref: 'Crawler'
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Property'
  },
  tags: [{
    type: Schema.Types.ObjectId,
    ref: 'Property'
  }],
  status: {
    type: Number,
    default: 1
  }
}, {
  timestamps: true,
  collection: 'crawl_templates'
});

module.exports = mongoose.model('CrawlTemplate', Schema);
