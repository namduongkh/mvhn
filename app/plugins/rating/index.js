'use strict';

import mongoose from 'mongoose';
import RatingsController from './controllers/ratings.controller.js';
import { Routes, ResourcesController } from "@core/modules";

const Rating = mongoose.model('Rating');

exports.register = function (server, options, next) {
    const routes = new Routes(server);
    routes.resources(ResourcesController, 'ratings', Rating);

    server.route({
        method: 'GET',
        path: '/ratings',
        config: new RatingsController('index').routeConfig()
    })

    server.route({
        method: 'POST',
        path: '/ratings',
        config: new RatingsController('create').routeConfig()
    })
};

exports.register.attributes = {
    name: 'rating'
};
