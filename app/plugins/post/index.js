'use strict';
import mongoose from "mongoose";
import CmsPostsController from "./controllers/cms_posts.controller";
import PostController from './controllers/posts.controller.js';
import { Routes, ServerRouter } from "@core/modules";

const Post = mongoose.model('Post');

exports.register = async function (server, options, next) {
    const routes = new Routes(server);
    routes.resources(CmsPostsController, 'posts', Post);
    routes.resources(CmsPostsController, '{type}/posts', Post);

    new ServerRouter(server).resources('{type}/posts', PostController, {
        only: ['index', 'show']
    }).member('filter-view', { method: 'GET', action: 'filterView' });

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
