'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var MigrationSchema = new Schema({
  version: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    index: true
  },
  // name: {
  //   type: String,
  //   trim: true,
  //   required: true,
  //   index: true
  // }
}, {
  timestamps: true,
  collection: 'migrations'
});

module.exports = mongoose.model('Migration', MigrationSchema);
