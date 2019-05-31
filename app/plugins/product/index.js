'use strict';

import mongoose from 'mongoose';
import ProductController from './controllers/product.controller.js';
const Product = mongoose.model('Product');

exports.register = function (server, options, next) {
    const routes = new Routes(server);
    routes.resources(ResourcesController, 'products', Product);

    server.route({
        method: 'GET',
        path: '/products/{slug}',
        config: new ProductController('show').routeConfig()
    })
};

exports.register.attributes = {
    name: 'product'
};