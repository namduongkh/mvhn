'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var Schema = new Schema({
  key: {
    type: String,
    required: true,
    trim: true
  },
  name: {
    type: String,
    trim: true
  },
  status: {
    type: Number,
    default: 1
  },
  fields: []
}, {
    collection: 'settings',
    timestamps: true,
    versionKey: false,
    strict: false
  });

function convertData(data) {
  if (data.constructor == {}.constructor) {
    for (let i in data) {
      if (i == "_id") {
        break;
      }
      data[i] = convertData(data[i]);
    }
  } else {
    try {
      data = JSON.parse(data);
    } catch (error) { }
  }
  return data;
}

Schema.pre('save', function (next) {
  if (!this.key) {
    let key = this._id;
    if (this.name) {
      key = this.name + "_" + key;
    }
    this.key = slug(key);
  }
  for (let i in this._doc) {
    if (i == "_id") {
      break;
    }
    this._doc[i] = convertData(this._doc[i]);
  }
  next();
});

module.exports = mongoose.model('Setting', Schema);
