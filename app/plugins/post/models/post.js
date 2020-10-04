'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
import Slug from "slug";
import _ from "lodash";

var PostSchema = new Schema({
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
    default: 'post',
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
  },
  products: [{
    type: Schema.Types.ObjectId,
    ref: 'Product'
  }],
  source: {
    type: String
  },
  customFields: [],
  customData: {},
  customConfig: {}
}, {
  timestamps: true,
  collection: 'posts'
});

PostSchema.pre('validate', async function (next) {
  if (!this.slug && this.title) {
    this.slug = await generateSlug(this.title);
  }

  return next();
});

async function generateSlug(title) {
  const Post = mongoose.model('Post');
  let slug = Slug(title).toLowerCase();
  if (await Post.exists({ slug })) {
    slug += '-' + Date.now();
  }
  return slug;
}

module.exports = mongoose.model('Post', PostSchema);
