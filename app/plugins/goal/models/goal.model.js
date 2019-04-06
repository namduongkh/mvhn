'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
import moment from "moment";

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
    default: [1, 2, 3, 4, 5, 6, 7]
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

GoalSchema.methods.generateActivities = async function () {
  this.activities = [];
  const Activity = mongoose.model('Activity');
  let date = moment(this.start_date);
  let end_date = moment(this.end_date);
  while (date <= end_date) {
    let enabled = this.day_of_weeks.includes(date.weekday());
    let activity = await Activity.findOne({
      goal: this._id,
      date: date.toDate()
    }) || await new Activity({
      goal: this._id,
      date: date.toDate()
    });
    activity.enabled = enabled;
    activity = await activity.save();
    this.activities.push(activity._id);
    date.add(1, 'days');
  }
  return this;
}

module.exports = mongoose.model('Goal', GoalSchema);