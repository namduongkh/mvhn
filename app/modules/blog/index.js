'use strict';

const BlogController = require('./controllers/blog.controller.js');
const BlogApiController = require('./controllers/blog-api.controller.js');

exports.register = function (server, options, next) {
    server.route({
        method: 'GET',
        path: '/blogs',
        config: BlogController.index
    });

    server.route({
        method: 'GET',
        path: '/blogs/new',
        config: BlogController.new
    });

    server.route({
        method: 'GET',
        path: '/blogs/{slug}',
        config: BlogController.show
    });

    server.route({
        method: 'GET',
        path: '/blogs/{slug}.pn',
        config: BlogController.show
    });

    server.route({
        method: 'GET',
        path: '/blogs/delete/{id}',
        config: BlogController.delete
    });

    server.route({
        method: 'GET',
        path: '/blogs/edit/{id}',
        config: BlogController.edit
    });

    // API --------------------------------
    server.route({
        method: 'POST',
        path: '/api/blogs/create',
        config: BlogApiController.create
    });

    server.route({
        method: 'PUT',
        path: '/api/blogs/update/{id}',
        config: BlogApiController.update
    });

    server.route({
        method: 'POST',
        path: '/api/blogs/generate-slug',
        config: BlogApiController.generateSlug
    });

    next();
};

exports.register.attributes = {
    name: 'blog'
};