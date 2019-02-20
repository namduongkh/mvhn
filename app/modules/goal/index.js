'use strict';

const GoalController = require('./controllers/goal.controller.js');
const GoalApiController = require('./controllers/goal-api.controller.js');

exports.register = function (server, options, next) {
    server.route({
        method: 'GET',
        path: '/goals',
        config: GoalController.index
    });

    server.route({
        method: 'GET',
        path: '/goals/new',
        config: GoalController.new
    });

    server.route({
        method: 'GET',
        path: '/goals/{id}',
        config: GoalController.show
    });

    server.route({
        method: 'GET',
        path: '/goals/{id}.pn',
        config: GoalController.show
    });

    server.route({
        method: 'GET',
        path: '/goals/{id}.pngoal',
        config: GoalController.show
    });

    server.route({
        method: 'GET',
        path: '/goals/delete/{id}',
        config: GoalController.delete
    });

    server.route({
        method: 'GET',
        path: '/goals/edit/{id}',
        config: GoalController.edit
    });

    // API --------------------------------
    server.route({
        method: 'POST',
        path: '/api/goals/create',
        config: GoalApiController.create
    });

    server.route({
        method: 'PUT',
        path: '/api/goals/update/{id}',
        config: GoalApiController.update
    });

    next();
};

exports.register.attributes = {
    name: 'goal'
};