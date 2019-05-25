'use strict';

import mongoose from 'mongoose';
import <%= modelName %>Controller from './controllers/<%= pluginName %>.controller.js';
const <%= modelName %> = mongoose.model('<%= modelName %>');

exports.register = function (server, options, next) {
    const routes = new Routes(server);
    routes.resources(ResourcesController, '<%= collectionName %>', <%= modelName %>);

    server.route({
        method: 'GET',
        path: '/<%= collectionName %>',
        config: new <%= modelName %>Controller('example').routeConfig()
    })
};

exports.register.attributes = {
    name: '<%= pluginName %>'
};