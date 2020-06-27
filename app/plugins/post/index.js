'use strict';
import mongoose from "mongoose";
import CmsPostsController from "./controllers/cms_posts.controller";
import PostController from './controllers/posts.controller.js';
import { Routes } from "@core/modules";

const Post = mongoose.model('Post');

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
