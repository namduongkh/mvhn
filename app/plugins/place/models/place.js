'use strict';

var mongoose = require('mongoose');

var Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true
  },
  address: {
    type: String,
    required: true
  },
  lat: {
    type: Number
  },
  lng: {
    type: Number
  },
  placeId: {
    type: String
  },
  provinceId: {
    type: Number
  }
}, {
  timestamps: true,
  collection: 'places'
});

module.exports = mongoose.model('Place', Schema);
