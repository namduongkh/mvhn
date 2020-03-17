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
    enum: ['post'],
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
  }
}, {
  timestamps: true,
  collection: 'posts'
});

PostSchema.pre('validate', async function (next) {
  if (!this.slug && this.title) {
    this.slug = await generateSlug(this.title);
    console.log(123, this.slug);
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

// PostSchema.post('save', async function (doc) {
//   if (!doc.allowCreateLink) return;

//   let docFields = _.keys(doc.toJSON());
//   let intersections = _.intersection(docFields, ['slug']);
//   if (!doc.isNew && !intersections.length) return;

//   return await doc.createLink();
// });

// PostSchema.methods.createLink = async function () {
//   const Link = mongoose.model('Link');

//   let link = await Link.findOne({
//     objectModel: 'Post',
//     objectId: this._id
//   }).lean() || new Link({
//     objectModel: 'Post',
//     objectId: this._id
//   });

//   link.title = this.title;
//   link.url = `/posts/${this.slug}`;

//   console.log('Create link object', link);
//   await link.save();
// };

module.exports = mongoose.model('Post', PostSchema);
