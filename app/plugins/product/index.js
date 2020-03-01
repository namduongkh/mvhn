'use strict';

import mongoose from 'mongoose';
import ProductController from './controllers/product.controller.js';
const Product = mongoose.model('Product');

exports.register = function (server, options, next) {
    new Routes(server).resources(ResourcesController, 'products', Product);
    new Routes(server, null, {
        parentObjectConfig: {
            param: 'storeId',
            model: 'Store',
            attribute: 'store'
        }
    }).resources(ResourcesController, 'stores/{storeId}/products', Product);

    new ServerRouter(server).resources('products', ProductController, {
        only: ['show']
    });

    new ServerRouter(server).resources('stores/{storeId}/products', ProductController, {
        only: ['index']
    });
};

exports.register.attributes = {
    name: 'product'
};
