'use strict';

import mongoose from 'mongoose';
import CmsMongosController from './controllers/cms_mongos_controller.js';
import CmsMongoIndexesController from './controllers/cms_mongo_indexes_controller.js';

exports.register = function (server, options, next) {
    const devtoolRouter = new Routes(server, 'devtools/mongos');
    devtoolRouter.customRoute('GET', '', CmsMongosController, 'index');
    devtoolRouter.customRoute('GET', 'models', CmsMongosController, 'getAllModels');

    const devtoolWithModelRouter = new Routes(server, 'devtools/mongos/{model}');
    devtoolWithModelRouter.resources(CmsMongosController)
    const devtoolCollectionIndexes = new Routes(server, 'devtools/mongos/{model}/indexes');
    devtoolCollectionIndexes.resources(CmsMongoIndexesController)
};

exports.register.attributes = {
    name: 'devtool'
};
