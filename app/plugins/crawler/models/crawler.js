'use strict';

import axios from 'axios';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var Schema = new Schema({
  name: {
    type: String,
  },
  url: {
    type: String,
  },
  urlPattern: {
    type: String,
  },
  titleSelector: {
    type: String,
  },
  summarySelector: {
    type: String,
  },
  contentSelector: {
    type: String,
  },
  exceptSelector: {
    type: String,
  },
  status: {
    type: Number,
    default: 1
  }
}, {
  timestamps: true,
  collection: 'crawlers'
});

module.exports = mongoose.model('Crawler', Schema);
