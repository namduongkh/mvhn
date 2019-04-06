
'use strict';
import mongoose from "mongoose";
const Goal = mongoose.model('Goal');
import GoalHelper from "./goal.helper";
import _ from "lodash";

exports.create = {
  handler: async (request, h) => {
    if (request.payload.goal) {
      try {
        let goal = await new Goal(request.payload.goal).generateActivities();
        goal = await goal.save();
        return reply(goal);
      } catch (error) {
        console.log('Error', error);
        return reply(false).code(400);
      }
    } else {
      return reply(false).code(400);
    }
  }
};

exports.update = {
  pre: [{
    method: GoalHelper.loadGoal,
    assign: 'goal'
  }],
  handler: async (request, h) => {
    let { goal } = request.pre;
    if (goal) {
      try {
        goal = _.extend(goal, request.payload.goal);
        goal = await goal.generateActivities();
        goal = await goal.save();
        return reply(goal);
      } catch (error) {
        console.log('Error', error);
        return reply(false).code(400);
      }
    } else {
      return reply(false).code(400);
    }
  }
};
