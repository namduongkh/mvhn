'use strict';

import mongoose from 'mongoose';
import ProductController from './controllers/product.controller.js';
import CmsProductsController from './controllers/cms_products.controller';
import { ServerRouter, Routes, ResourcesController } from "@core/modules";

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
        only: ['index', 'show']
    });

    new ServerRouter(server).resources('stores/{storeId}/products', ProductController, {
        only: ['index']
    });
};

exports.register.attributes = {
    name: 'product'
};
