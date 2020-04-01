'use strict';

var mongoose = require('mongoose');

var Schema = new mongoose.Schema({
  placeId: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  lat: {
    type: Number,
    required: true
  },
  lng: {
    type: Number,
    required: true
  }
}, {
  timestamps: true,
  collection: 'places'
});

module.exports = mongoose.model('Place', Schema);
