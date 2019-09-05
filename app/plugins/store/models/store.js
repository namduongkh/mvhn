'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
import Slug from "slug";

var Schema = new Schema({
  name: {
    type: String,
    trim: true,
    require: true
  },
  slug: {
    type: String,
    require: true
  },
  logo: {
    type: String
  },
  description: {
    type: String,
  },
  address: {
    type: String,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  status: {
    type: Number,
    default: 1
  }
}, {
  timestamps: true,
  collection: 'stores'
});

Schema.pre('save', function (next) {
  if (!this.slug && this.name) {
    this.slug = Slug(this.name).toLowerCase();
  }

  return next();
});

module.exports = mongoose.model('Store', Schema);
