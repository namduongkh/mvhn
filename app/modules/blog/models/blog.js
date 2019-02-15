'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var BlogSchema = new Schema({
  title: {
    type: String,
    trim: true,
    require: true
  },
  slug: {
    type: String,
    trim: true,
    unique: 'Slug already exists',
    require: true
  },
  type: {
    type: 'string',
    enum: ['post', 'share'],
    require: true
  },
  content: {
    type: String
  },
  url: {
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
    collection: 'blogs'
  });

module.exports = mongoose.model('Blog', BlogSchema);