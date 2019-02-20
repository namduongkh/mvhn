'use strict';
import mongoose from "mongoose";
const Goal = mongoose.model('Goal');
import _ from "lodash";

export default {
  async  loadGoal(request, reply, options = {}) {
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
  }
}