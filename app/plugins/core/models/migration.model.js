'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
import Glob from 'glob';

var MigrationSchema = new Schema({
  version: {
    type: String,
    trim: true,
    require: true,
    unique: true,
    index: true
  },
  // name: {
  //   type: String,
  //   trim: true,
  //   require: true,
  //   index: true
  // }
}, {
    timestamps: true,
    collection: 'migrations'
  });

module.exports = mongoose.model('Migration', MigrationSchema);