'use strict';

import mongoose from 'mongoose';
import CmsMongosController from './controllers/cms_mongos_controllers.js';

exports.register = function (server, options, next) {
    const devtoolRouter = new Routes(server, 'devtools/mongos');
    devtoolRouter.customRoute('GET', '', CmsMongosController, 'index');
    devtoolRouter.customRoute('GET', 'models', CmsMongosController, 'getAllModels');

    const deltoolWithModelRouter = new Routes(server, 'devtools/mongos/{model}');
    deltoolWithModelRouter.resources(CmsMongosController)
};

exports.register.attributes = {
    name: 'devtool'
};
