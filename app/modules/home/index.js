'use strict';

import Slug from "slug";
import Striptags from "striptags";
const HomeController = require('./controllers/home.controller.js');

exports.register = function (server, options, next) {
    let config = server.configManager;

    server.route({
        method: 'GET',
        path: '/',
        config: HomeController.index
    });

    server.route({
        method: 'GET',
        path: '/portfolio',
        config: HomeController.portfolio
    });

    config.get('web.context.info.portfolio').map(portfolio => {
        return server.route({
            method: 'GET',
            path: '/portfolio/' + Slug(portfolio.name).toLowerCase(),
            handler: (request, reply) => {
                return reply.view('home/views/portfolio', {
                    meta: {
                        title: portfolio.name,
                        description: Striptags(portfolio.description).substr(0, 160),
                        image: portfolio.image
                    },
                    paddingTop: true
                });
            }
        });
    });

    server.route({
        method: 'POST',
        path: '/api/contact',
        config: HomeController.contact
    });

    next();
};

exports.register.attributes = {
    name: 'home'
};