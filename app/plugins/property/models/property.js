'use strict';

var Slug = require('slug');
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var PropertySchema = new Schema({
  name: {
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
  color: {
    type: String,
    default: randomColor
  },
  textClassname: {
    type: String,
    enum: [
      'property-text-white',
      'property-text-black'
    ],
    default: 'property-text-black'
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

PropertySchema.pre('validate', function (next) {
  if (!this.slug) {
    this.slug = Slug(this.name).toLowerCase();
  }

  return next();
});

PropertySchema.pre('save', function (next) {
  let contrast = getContrast(this.color);
  this.textClassname = contrast > 125 ? 'property-text-black' : 'property-text-white'

  return next();
});

module.exports = mongoose.model('Property', PropertySchema);

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function getContrast(hex) {
  let rgb = hexToRgb(hex);

  // http://www.w3.org/TR/AERT#color-contrast
  let o = Math.round(((parseInt(rgb.r) * 299) +
    (parseInt(rgb.g) * 587) +
    (parseInt(rgb.b) * 114)) / 1000);

  return o; // > 125 -> contract white
}

function randomColor() {
  let r = Math.round(Math.random() * 255);
  let g = Math.round(Math.random() * 255);
  let b = Math.round(Math.random() * 255);

  return rgbToHex(r, g, b);
}
