'use strict';
import mongoose from "mongoose";
import CmsPropertiesController from "./controllers/cms_properties.controller";
import { Routes } from "@core/modules";

const Property = mongoose.model('Property');

exports.register = function (server, options, next) {
    const routes = new Routes(server);
    routes.resources(CmsPropertiesController, 'properties', Property);
};

exports.register.attributes = {
    name: 'property'
};
