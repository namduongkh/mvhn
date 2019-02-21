'use strict';
import mongoose from "mongoose";
import Boom from "boom";
import striptags from "striptags";
import GoalHelper from "./goal.helper";
const Goal = mongoose.model('Goal');
const Activity = mongoose.model('Activity');

exports.index = {
    handler: async (request, reply) => {
        let goals = await Goal.find({
            status: 1,
            category: { $in: [undefined, 'goal'] }
        }).sort({
            createdAt: -1
        }).lean();
        return reply.view('goal/views/index', {
            meta: {
                title: "Goals"
            },
            goals
        });
    }
};

exports.new = {
    handler: (request, reply) => {
        return reply.view('goal/views/new', {
            meta: {
                title: "New Goal"
            }
        });
    }
};

exports.edit = {
    pre: [{
        method: GoalHelper.loadGoal,
        assign: 'goal'
    }],
    handler: (request, reply) => {
        let { goal } = request.pre;
        return reply.view('goal/views/edit', {
            meta: {
                title: "Edit Goal"
            },
            goal
        });
    }
};

exports.show = {
    pre: [{
        method: (request, reply) => {
            return GoalHelper.loadGoal(request, reply, {
                lean: true
            });
        },
        assign: 'goal'
    }, {
        method: async (request, reply) => {
            let { goal } = request.pre;
            return reply(await Activity.find({
                _id: { $in: goal.activities }
            }).lean());
        },
        assign: 'activities'
    }],
    handler: async (request, reply) => {
        let { goal, activities } = request.pre;
        try {
            return reply.view('goal/views/show', {
                meta: {
                    title: goal.name,
                    description: (striptags(goal.description) || "").substr(0, 160),
                    image: goal.thumb
                },
                goal,
                allowAdmin: request.query.allowAdmin,
                activities
            });
        } catch (error) {
            return reply(Boom.notFound());
        }
    }
};

exports.delete = {
    pre: [{
        method: GoalHelper.loadGoal,
        assign: 'goal'
    }],
    handler: async (request, reply) => {
        let { goal } = request.pre;
        try {
            goal.remove();
            return reply.redirect('/goals');
        } catch (error) {
            return reply(Boom.notFound());
        }
    }
};
