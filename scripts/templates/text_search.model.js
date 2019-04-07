'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var <%= modelName %>TextSearchSchema = new Schema({
  text: {
    type: String,
    trim: true,
    require: true,
    index: true
  },
  object: {
    type: Schema.Types.ObjectId,
    ref: '<%= modelName %>'
  }
}, {
    timestamps: true,
    collection: '<%= collectionName %>_text_searchs'
  });

module.exports = mongoose.model('<%= modelName %>', <%= modelName %>TextSearchSchema);