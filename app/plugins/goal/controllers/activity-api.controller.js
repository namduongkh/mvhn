
'use strict';
import mongoose from "mongoose";
import GoalHelper from "./goal.helper";
import _ from "lodash";
const Activity = mongoose.model('Activity');

// exports.create = {
//   handler: async (request, h) => {
//     if (request.payload.activity) {
//       try {
//         let activity = await new Activity(request.payload.activity).generateActivities();
//         activity = await activity.save();
//         return reply(activity);
//       } catch (error) {
//         console.log('Error', error);
//         return reply(false).code(400);
//       }
//     } else {
//       return reply(false).code(400);
//     }
//   }
// };

exports.show = {
  pre: [{
    method: (request, h) => {
      return GoalHelper.loadActivity(request, h, {
        lean: true
      });
    },
    assign: 'activity'
  }],
  handler: async (request, h) => {
    let { activity } = request.pre;
    return reply(activity)
  }
};

exports.update = {
  pre: [{
    method: GoalHelper.loadActivity,
    assign: 'activity'
  }],
  handler: async (request, h) => {
    let { activity } = request.pre;
    if (activity) {
      try {
        activity = _.extend(activity, request.payload.activity);
        activity = await activity.save();
        return reply(activity);
      } catch (error) {
        console.log('Error', error);
        return reply(false).code(400);
      }
    } else {
      return reply(false).code(400);
    }
  }
};

exports.delete = {
  pre: [{
    method: GoalHelper.loadActivity,
    assign: 'activity'
  }],
  handler: async (request, h) => {
    let { activity } = request.pre;
    if (activity) {
      try {
        activity = await activity.remove();
        return reply(activity);
      } catch (error) {
        console.log('Error', error);
        return reply(false).code(400);
      }
    } else {
      return reply(false).code(400);
    }
  }
};
