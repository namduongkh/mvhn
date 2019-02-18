'use strict';

const SeoController = require('./controllers/seo.controller.js');

exports.register = function(server, options, next) {
    server.route({
        method: 'GET',
        path: '/google{googleCode}.html',
        config: SeoController.googleVerify
    });

    server.route({
        method: 'GET',
        path: '/BingSiteAuth.xml',
        config: SeoController.bingVerify
    });

    next();
};

exports.register.attributes = {
    name: 'seo'
};