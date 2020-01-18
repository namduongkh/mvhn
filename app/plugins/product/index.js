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

    new ServerRouter(server).resources('products', ProductController, {
        only: ['show']
    });
};

exports.register.attributes = {
    name: 'product'
};
