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
  content: {
    type: String
  },
  thumb: {
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
