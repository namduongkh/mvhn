'use strict';

import _ from "lodash";
import Constant from "./constant.js";
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var Schema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  fromPlace: {
    type: Schema.ObjectId,
    ref: 'Place'
  },
  toPlace: {
    type: Schema.ObjectId,
    ref: 'Place'
  },
  time: {
    type: Date
  },
  description: {
    type: String
  },
  vehicleType: {
    type: Number,
    enum: _.keys(Constant.VEHICLE_TYPE).map((i) => Number(i)),
    default: Number(Constant.INVERT_VEHICLE_TYPE['Của tôi'])
  },
  status: {
    type: Number,
    default: 1
  }
}, {
  timestamps: true,
  collection: 'carpools'
});

module.exports = mongoose.model('Carpool', Schema);
