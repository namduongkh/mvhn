'use strict';

import mongoose from 'mongoose';
const Batchlog = mongoose.model('Batchlog');

exports.register = function (server, options, next) {
    const cmsRoutes = new Routes(server);
    cmsRoutes.resources(ResourcesController, 'batchlogs', Batchlog);
};

exports.register.attributes = {
    name: 'batchlog'
};
