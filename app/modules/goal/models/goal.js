'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var GoalSchema = new Schema({
  name: {
    type: String,
    trim: true,
    require: true
  },
  start_date: {
    type: Date
  },
  end_date: {
    type: Date
  },
  day_of_weeks: {
    type: Array,
    default: [0, 1, 2, 3, 4, 5, 6]
  },
  description: {
    type: String
  },
  thumb: {
    type: String
  },
  status: {
    type: Number,
    default: 1
  },
  activities: [{
    type: Schema.Types.ObjectId,
    ref: 'Activity'
  }]
}, {
    timestamps: true,
    collection: 'goals'
  });

module.exports = mongoose.model('Goal', GoalSchema);