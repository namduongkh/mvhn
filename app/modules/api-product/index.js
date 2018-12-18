'use strict';

const Controller = require('./controllers/product.controller.js');

exports.register = function(server, options, next) {
    var configManager = server.plugins['hapi-kea-config'];

    server.route({
        method: 'POST',
        path: '/api/product/createProduct',
        config: Controller.createProduct
    });
    server.route({
        method: 'POST',
        path: '/api/product/updateProduct',
        config: Controller.updateProduct
    });
    server.route({
        method: 'POST',
        path: '/api/product/deleteProduct',
        config: Controller.deleteProduct
    });
    server.route({
        method: 'POST',
        path: '/api/product/detailProduct',
        config: Controller.detailProduct
    });
    server.route({
        method: 'GET',
        path: '/api/product/productList',
        config: Controller.productList
    });
    server.route({
        method: 'GET',
        path: '/api/product/productBanner',
        config: Controller.productBanner
    });
    server.route({
        method: 'POST',
        path: '/api/product/order',
        config: Controller.order
    });
    server.route({
        method: 'POST',
        path: '/api/product/addCart',
        config: Controller.addCart
    });

    next();
};

exports.register.attributes = {
    name: 'api-product'
};