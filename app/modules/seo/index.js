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

    server.route({
        method: 'GET',
        path: '/sitemap.xml',
        config: SeoController.sitemap_xml
    });

    server.route({
        method: 'GET',
        path: '/sitemap',
        config: SeoController.sitemap
    });

    server.route({
        method: 'GET',
        path: '/robots.txt',
        config: SeoController.robots
    });
};

exports.register.attributes = {
    name: 'seo'
};