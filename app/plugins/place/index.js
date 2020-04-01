'use strict';

import mongoose from 'mongoose';
import PlacesController from './controllers/places_controller.js';
import PlaceFinder from "./services/place_finder";

exports.register = function (server, options, next) {
    const serverRouter = new ServerRouter(server);

    serverRouter.resources('places', PlacesController, {
        only: []
    }).member('search');

    server.expose('PlaceFinder', PlaceFinder);
};

exports.register.attributes = {
    name: 'place'
};
