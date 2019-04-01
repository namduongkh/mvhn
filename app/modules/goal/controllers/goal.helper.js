'use strict';
import mongoose from "mongoose";
import _ from "lodash";
const Goal = mongoose.model('Goal');
const Activity = mongoose.model('Activity');

export default {
  async  loadGoal(request, h, options = {}) {
    options = _.merge(options, {
      lean: false,
      filter: {
        _id: request.params.id || request.query.id || { $ne: undefined }
      }
    });
    if (options.lean) {
      return reply(await Goal.findOne({
        ...options.filter
      }).lean());
    } else {
      return reply(await Goal.findOne({
        ...options.filter
      }));
    }
  },
  async  loadActivity(request, h, options = {}) {
    options = _.merge(options, {
      lean: false,
      filter: {
        _id: request.params.id || request.query.id || { $ne: undefined }
      }
    });
    if (options.lean) {
      return reply(await Activity.findOne({
        ...options.filter
      }).lean());
    } else {
      return reply(await Activity.findOne({
        ...options.filter
      }));
    }
  }
}