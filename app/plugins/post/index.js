'use strict';
import mongoose from "mongoose";
import CmsPostsController from "./controllers/cms_posts.controller";
import Routes from "../cms/controllers/routes.controller";
const Post = mongoose.model('Post');

const PostController = require('./controllers/post.controller.js');

exports.register = function (server, options, next) {
    const routes = new Routes(server);
    routes.resources(CmsPostsController, 'posts', Post);

    // server.route({
    //     method: 'GET',
    //     path: '/posts',
    //     config: PostController.index
    // });

    // server.route({
    //     method: 'GET',
    //     path: '/posts/new',
    //     config: PostController.new
    // });

    server.route({
        method: 'GET',
        path: '/',
        config: PostController.index
    });

    server.route({
        method: 'GET',
        path: '/posts/{slug}',
        config: PostController.show
    });

    server.route({
        method: 'GET',
        path: '/categories/{slug}',
        config: PostController.listByCategory
    });

    // server.route({
    //     method: 'GET',
    //     path: '/pages/{slug}',
    //     config: PostController.page
    // });

    // server.route({
    //     method: 'GET',
    //     path: '/posts/{slug}.pn',
    //     config: PostController.show
    // });

    // server.route({
    //     method: 'GET',
    //     path: '/pages/{slug}.pn',
    //     config: PostController.page
    // });

    // server.route({
    //     method: 'GET',
    //     path: '/posts/delete/{id}',
    //     config: PostController.delete
    // });

    // server.route({
    //     method: 'GET',
    //     path: '/posts/edit/{id}',
    //     config: PostController.edit
    // });

    // API --------------------------------
    // server.route({
    //     method: 'POST',
    //     path: '/api/posts/create',
    //     config: PostApiController.create
    // });

    // server.route({
    //     method: 'POST',
    //     path: '/api/posts/fetch-metadata',
    //     config: PostApiController.fetchMetadata
    // });

    // server.route({
    //     method: 'PUT',
    //     path: '/api/posts/update/{id}',
    //     config: PostApiController.update
    // });

    // server.route({
    //     method: 'POST',
    //     path: '/api/posts/generate-slug',
    //     config: PostApiController.generateSlug
    // });
};

exports.register.attributes = {
    name: 'post'
};