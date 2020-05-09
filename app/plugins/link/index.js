'use strict';

import mongoose from 'mongoose';
import LinksController from './controllers/links.controller.js';
import CmsLinksController from './controllers/cms_links.controller.js';
import { Routes } from "@core/modules";

const Link = mongoose.model('Link');

exports.register = function (server, options, next) {
    const routes = new Routes(server);
    routes.resources(CmsLinksController, 'links', Link);

    // server.route({
    //     method: 'GET',
    //     path: '/links',
    //     config: new LinksController('example').routeConfig()
    // })
};

exports.register.attributes = {
    name: 'link'
};
