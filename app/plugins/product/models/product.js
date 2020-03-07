'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  slug = require('slug');

var Schema = new Schema({
  name: {
    type: String,
    trim: true,
    require: true
  },
  slug: {
    type: String,
    trim: true,
    require: true,
    unique: true
  },
  urls: [{
    name: { type: String },
    path: { type: String }
  }],
  thumb: {
    type: String,
    require: true
  },
  content: {
    type: String
  },
  price: {
    type: Number,
    default: 0
  },
  rootPrice: {
    type: Number,
    default: 0
  },
  quantity: {
    type: Number,
    default: 0
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Property'
  },
  tags: [{
    type: Schema.Types.ObjectId,
    ref: 'Property'
  }],
  unit: {
    type: String
  },
  type: {
    type: String,
    enum: [
      'sale',
      'service'
    ],
    default: 'sale'
  },
  status: {
    type: Number,
    default: 1
  }
}, {
    timestamps: true,
    collection: 'products'
  });

Schema.pre('save', async function (next) {
  if (!this.slug)
    this.slug = slug(this.name);

  const Product = mongoose.model('Product');
  let existed = await Product.count({ slug: this.slug, _id: { $ne: this._id } });
  if (existed) {
    this.slug += '_' + Date.now()
  }
  next();
});

module.exports = mongoose.model('Product', Schema);
