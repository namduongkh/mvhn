'use strict';
import mongoose from "mongoose";
import Boom from "boom";
import striptags from "striptags";
import GoalHelper from "./goal.helper";
const Goal = mongoose.model('Goal');
const Activity = mongoose.model('Activity');

exports.index = {
    handler: async (request, h) => {
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
    handler: (request, h) => {
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
    handler: (request, h) => {
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
        method: (request, h) => {
            return GoalHelper.loadGoal(request, h, {
                lean: true
            });
        },
        assign: 'goal'
    }, {
        method: async (request, h) => {
            let { goal } = request.pre;
            return reply(await Activity.find({
                _id: { $in: goal.activities }
            }).lean());
        },
        assign: 'activities'
    }],
    handler: async (request, h) => {
        let { goal, activities } = request.pre;
        let completedPercent = Math.ceil(activities.filter(ac => { return ac.enabled && ac.completed }).length / activities.filter(ac => { return ac.enabled }).length * 100);
        try {
            return reply.view('goal/views/show', {
                meta: {
                    title: goal.name,
                    description: (striptags(goal.description) || "").substr(0, 160),
                    image: goal.thumb
                },
                goal,
                allowAdmin: request.query.allowAdmin,
                activities,
                completedPercent
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
    handler: async (request, h) => {
        let { goal } = request.pre;
        try {
            goal.remove();
            return reply.redirect('/goals');
        } catch (error) {
            return reply(Boom.notFound());
        }
    }
};
