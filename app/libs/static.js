'use strict';

const path = require('path');

exports.register = function(server, options, next) {
    server.route({
        method: 'GET',
        path: '/modules/{module}/views/js/template/{file}',
        handler: function(request, reply) {
            let file = 'app/modules/' + request.params.module + '/views/js/template/' + request.params.file;
            reply.file(file);
        },
        config: {
            auth: false
        }
    });

    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: 'public'
            }
        },
        config: {
            auth: false
        }
    });
    return next();
};

exports.register.attributes = {
    name: 'app-static',
    dependencies: 'inert'
};