'use strict';

import mongoose from 'mongoose';
import CmsImportsController from "./controllers/cms_importers_controller";
const Importer = mongoose.model('Importer');

exports.register = function (server, options, next) {
    const cmsRoutes = new Routes(server, 'importers');
    cmsRoutes.resources(CmsImportsController, 'importers', Importer);
    cmsRoutes.customRoute('POST', '{id}/run', CmsImportsController, 'run', Importer);
};

exports.register.attributes = {
    name: 'importer'
};
