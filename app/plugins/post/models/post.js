'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
import Slug from "slug";

var PostSchema = new Schema({
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
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Property'
  },
  tags: [{
    type: Schema.Types.ObjectId,
    ref: 'Property'
  }],
  type: {
    type: String,
    enum: ['post'],
    default: 'post',
    require: true
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
    default: 1,
    enum: [
      0,
      1,
      2
    ]
  },
  views: {
    type: Number,
    default: 0
  },
  featured: {
    type: Boolean,
    default: false
  }
}, {
    timestamps: true,
    collection: 'posts'
  });

PostSchema.pre('save', function (next) {
  if (!this.slug && this.title) {
    this.slug = Slug(this.title).toLowerCase();
  }

  return next();
});

module.exports = mongoose.model('Post', PostSchema);