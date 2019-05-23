'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var MediaSchema = new Schema({
  name: {
    type: String,
    trim: true,
    require: true
  },
  path: {
    type: String,
    trim: true,
    require: true
  },
  ext: {
    type: String,
  }
}, {
    timestamps: true,
    collection: 'medias'
  });

module.exports = mongoose.model('Media', MediaSchema);
