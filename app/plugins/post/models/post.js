'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
import Slug from "slug";
import _ from "lodash";

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
  },
  products: [{
    type: Schema.Types.ObjectId,
    ref: 'Product'
  }]
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