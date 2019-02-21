
'use strict';
import mongoose from "mongoose";
import Slug from "slug";
const Goal = mongoose.model('Goal');
import GoalHelper from "./goal.helper";
import _ from "lodash";
import UrlMetadata from "url-metadata";

exports.create = {
  handler: async (request, reply) => {
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
  handler: async (request, reply) => {
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

exports.generateSlug = {
  handler: async (request, reply) => {
    let { title } = request.payload;
    let slug = Slug(title);
    let goal = Goal.findOne({
      slug: slug
    }).lean();
    if (goal && goal._id) {
      slug += `-${moment().format('DDMMYYYYHHmm')}`
    }
    return reply(slug.toLowerCase());
  }
};

exports.fetchMetadata = {
  handler: async (request, reply) => {
    let { url } = request.payload;
    UrlMetadata(url).then(
      function (metadata) { // success handler
        return reply(metadata);
      },
      function (error) { // failure handler
        return reply({});
      });
  }
};