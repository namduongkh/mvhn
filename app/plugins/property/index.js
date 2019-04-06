'use strict';
import mongoose from "mongoose";
// import ResourcesController from "../cms/controllers/resources.controller";
import CmsPropertiesController from "./controllers/cms_properties.controller";
import Routes from "../cms/controllers/routes.controller";
const Property = mongoose.model('Property');

exports.register = function (server, options, next) {
    const routes = new Routes(server);
    routes.resources(CmsPropertiesController, 'properties', Property);
};

exports.register.attributes = {
    name: 'property'
};