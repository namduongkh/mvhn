'use strict';

import Slug from "slug";
import Striptags from "striptags";
const HomeController = require('./controllers/home.controller.js');

exports.plugin = {
    register: function (server, options, next) {
        let config = server.configManager;

        server.route({
            method: 'GET',
            path: '/',
            config: HomeController.index
        });
    },
    name: 'home'
};
