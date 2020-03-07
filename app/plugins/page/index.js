'use strict';

import mongoose from 'mongoose';
import PagesController from './controllers/pages.controller.js';
const Page = mongoose.model('Page');

exports.register = function (server, options, next) {
    const routes = new Routes(server);
    routes.resources(ResourcesController, 'pages', Page);

    server.route({
        method: 'GET',
        path: '/{slug}.html',
        config: new PagesController('show').routeConfig()
    })

    server.route({
        method: 'GET',
        path: '/{slug}',
        config: new PagesController('show').routeConfig()
    })

    server.route({
        method: 'GET',
        path: '/landingpage',
        config: new PagesController('landingpage').routeConfig({
            auth: {
                strategy: 'jwt',
                scope: ['admin']
            }
        })
    })
};

exports.register.attributes = {
    name: 'page'
};
