'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
import Slug from "slug";
import _ from "lodash";

var PostTypeSchema = new Schema({
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
  status: {
    type: Number,
    default: 1,
    enum: [
      0,
      1,
      2
    ]
  },
  customFields: [],
}, {
  timestamps: true,
  collection: 'post_types'
});

PostTypeSchema.pre('validate', async function (next) {
  if (!this.slug && this.title) {
    this.slug = await generateSlug(this.title);
  }

  return next();
});

async function generateSlug(title) {
  const PostType = mongoose.model('PostType');
  let slug = Slug(title).toLowerCase();
  if (await PostType.exists({ slug })) {
    slug += '-' + Date.now();
  }
  return slug;
}

module.exports = mongoose.model('PostType', PostTypeSchema);
