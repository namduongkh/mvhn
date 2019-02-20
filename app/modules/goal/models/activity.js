'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ActivitySchema = new Schema({
  description: {
    type: String
  },
  result: {
    type: String
  },
  reached: {
    type: Boolean
  },
  date: {
    type: Date
  },
  status: {
    type: Number,
    default: 1
  },
  goal: {
    type: Schema.Types.ObjectId,
    ref: 'Goal'
  },
  enabled: {
    type: Boolean,
    default: true
  }
}, {
    timestamps: true,
    collection: 'activities'
  });

module.exports = mongoose.model('Activity', ActivitySchema);