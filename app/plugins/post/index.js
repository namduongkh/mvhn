'use strict';
import mongoose from "mongoose";
import CmsPostsController from "./controllers/cms_posts.controller";
const Post = mongoose.model('Post');
import PostController from './controllers/posts.controller.js';

exports.register = async function (server, options, next) {
    const routes = new Routes(server);
    routes.resources(CmsPostsController, 'posts', Post);

    server.route({
        method: 'GET',
        path: '/',
        config: new PostController('index').routeConfig()
    });

    server.route({
        method: 'GET',
        path: '/posts/{slug}',
        config: new PostController('show').routeConfig()
    });

    server.route({
        method: 'GET',
        path: '/categories/{categoryId}',
        config: new PostController('listByCategory').routeConfig()
    });

    server.route({
        method: 'GET',
        path: '/tags/{tagId}',
        config: new PostController('listByTag').routeConfig()
    });
};

exports.register.attributes = {
    name: 'post'
};
