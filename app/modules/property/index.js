'use strict';
import mongoose from "mongoose";
import Resources from "../cms/controllers/resources.controller";
import Routes from "../cms/controllers/routes.controller";
const Property = mongoose.model('Property');

exports.register = function (server, options, next) {
    const routes = new Routes(server);
    routes.resources(Resources, 'properties', Property);
};

exports.register.attributes = {
    name: 'property'
};