'use strict';

import mongoose from 'mongoose';
import ProductController from './controllers/product.controller.js';
const Product = mongoose.model('Product');

exports.register = function (server, options, next) {
    new Routes(server).resources(CmsProductsController, 'products', Product);
    new Routes(server, null, {
        parentObjectConfig: {
            param: 'storeId',
            model: 'Store',
            attribute: 'store'
        }
    }).resources(CmsProductsController, 'stores/{storeId}/products', Product);

    server.route({
        method: 'GET',
        path: '/products/{slug}',
        config: new ProductController('show').routeConfig()
    })
};

exports.register.attributes = {
    name: 'product'
};
