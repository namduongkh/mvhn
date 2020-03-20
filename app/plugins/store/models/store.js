'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
import Slug from "slug";

var Schema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  slug: {
    type: String,
    required: true
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
  provinceId: {
    type: Number
  },
  allowMultipleOrder: {
    type: Boolean,
    default: false
  },
  inPlaceServe: {
    type: Boolean,
    default: false
  },
  onlineServe: {
    type: Boolean,
    default: false
  },
  status: {
    type: Number,
    default: 1
  }
}, {
  timestamps: true,
  collection: 'stores'
});

Schema.pre('validate', function (next) {
  if (!this.slug && this.name) {
    this.slug = Slug(this.name).toLowerCase();
  }

  return next();
});

module.exports = mongoose.model('Store', Schema);
