'use strict';

import fs from "fs";
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var Schema = new Schema({
  name: {
    type: String,
    trim: true,
    require: true
  },
  classname: {
    type: String,
    trim: true,
    require: true,
    unique: true
  },
  description: {
    type: String,
  },
  templateFile: {
    type: String,
  },
  params: [{
    name: { type: String },
    key: { type: String },
    type: { type: String }
  }],
  status: {
    type: Number,
    default: 1
  }
}, {
  timestamps: true,
  collection: 'importers'
});

Schema.methods.run = async function (params) {
  let classFilePath = BASE_PATH + '/app/plugins/importer/classes/importers/' + this.classname + '.js';
  if (!params.file || !this.classname || !fs.existsSync(classFilePath)) return;

  try {
    let importerClass = require(classFilePath);
    let importer = new importerClass.default(params);

    return await importer.perform();
  } catch (error) {
    console.log('Importer running error:', error);
  }
};

module.exports = mongoose.model('Importer', Schema);
