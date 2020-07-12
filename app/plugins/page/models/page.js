'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var Schema = new Schema({
  title: {
    type: String,
    trim: true,
    required: true
  },
  slug: {
    type: String,
    trim: true,
    unique: 'Slug already exists',
    required: true
  },
  meta: {
    type: Object,
    default: {
      landingPage: false,
      hideNavBar: false,
      hideFooter: false
    }
  },
  content: {
    type: String
  },
  thumb: {
    type: String
  },
  template: {
    type: String
  },
  summary: {
    type: String
  },
  status: {
    type: Number,
    default: 1
  }
}, {
  timestamps: true,
  collection: 'pages'
});

module.exports = mongoose.model('Page', Schema);
