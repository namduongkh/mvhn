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
        path: '/blogs/delete/{id}',
        config: BlogController.delete
    });

    // API --------------------------------
    server.route({
        method: 'POST',
        path: '/api/blogs/create',
        config: BlogApiController.create
    });

    next();
};

exports.register.attributes = {
    name: 'blog'
};