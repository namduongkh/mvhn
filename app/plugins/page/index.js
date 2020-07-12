'use strict';

import mongoose from 'mongoose';
import PagesController from './controllers/pages.controller.js';
import PageSectionsController from './controllers/page_sections_controller.js';
import { ServerRouter, Routes, ResourcesController } from "@core/modules";

const Page = mongoose.model('Page');
const PageSection = mongoose.model('PageSection');

exports.register = function (server, options, next) {
    const routes = new Routes(server);
    routes.resources(ResourcesController, 'pages', Page);
    routes.resources(ResourcesController, 'page_sections', PageSection);

    const serverRouter = new ServerRouter(server);

    serverRouter.resources('page_sections', PageSectionsController, {
        only: ['new', 'create', 'show', 'update']
    });

    server.route({
        method: 'GET',
        path: '/{slug}.html',
        config: new PagesController('show').routeConfig()
    });

    server.route({
        method: 'GET',
        path: '/{slug}',
        config: new PagesController('show').routeConfig()
    });

    server.route({
        method: 'GET',
        path: '/{slug}/{subPage}.html',
        config: new PagesController('show').routeConfig()
    });

    server.route({
        method: 'GET',
        path: '/{template}/assets/{filePath*}',
        config: new PagesController('templateassets').routeConfig({
            auth: false
        })
    });

    server.route({
        method: 'GET',
        path: '/landingpage',
        config: new PagesController('landingpage').routeConfig({
            auth: {
                strategy: 'jwt',
                scope: ['admin']
            }
        })
    });
};

exports.register.attributes = {
    name: 'page'
};
