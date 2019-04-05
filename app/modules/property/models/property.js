'use strict';

var Slug = require('slug');
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var PropertySchema = new Schema({
  name: {
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
  color: {
    type: String,
    default: '#ffffff'
  },
  isChild: {
    type: Boolean,
    default: false
  },
  parent: {
    type: Schema.Types.ObjectId,
    ref: 'Property'
  },
  type: {
    type: String,
    enum: [
      'property'
    ],
    default: 'property'
  },
  status: {
    type: Number,
    default: 1
  }
}, {
    timestamps: true,
    collection: 'properties'
  });

PropertySchema.pre('save', function () {
  if (!this.slug) {
    this.slug = Slug(this.name);
  }
});

module.exports = mongoose.model('Property', PropertySchema);