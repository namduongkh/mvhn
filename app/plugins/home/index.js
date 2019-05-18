'use strict';

import Slug from "slug";
import Striptags from "striptags";
const PostController = require('../post/controllers/post.controller.js');

exports.plugin = {
    register: function (server, options, next) {
        let config = server.configManager;

        // server.route({
        //     method: 'GET',
        //     path: '/',
        //     config: PostController.index
        // });
    },
    name: 'home'
};
