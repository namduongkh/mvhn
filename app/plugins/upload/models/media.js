'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var MediaSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    index: true
  },
  path: {
    type: String,
    trim: true,
    required: true,
    index: true
  },
  ext: {
    type: String,
  },
  status: {
    type: Number,
    default: 1
  }
}, {
    timestamps: true,
    collection: 'medias'
  });

module.exports = mongoose.model('Media', MediaSchema);
