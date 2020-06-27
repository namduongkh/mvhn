'use strict';

import mongoose from 'mongoose';
import PlacesController from './controllers/places_controller.js';
import PlaceFinder from "./services/place_finder";
import { ServerRouter, Routes, ResourcesController } from "@core/modules";

const Place = mongoose.model('Place');

exports.register = function (server, options, next) {
    const cmsRoutes = new Routes(server, 'places');
    cmsRoutes.resources(ResourcesController, 'places', Place);

    const serverRouter = new ServerRouter(server);

    serverRouter.resources('places', PlacesController, {
        only: []
    })
        .member('search')
        .member('detail');

    server.expose('PlaceFinder', PlaceFinder);
};

exports.register.attributes = {
    name: 'place'
};
