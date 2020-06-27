'use strict';

import mongoose from 'mongoose';
import CmsImportsController from "./controllers/cms_importers_controller";
import { Routes } from "@core/modules";

const Importer = mongoose.model('Importer');

exports.register = function (server, options, next) {
    const cmsRoutes = new Routes(server, 'importers');
    cmsRoutes.resources(CmsImportsController, 'importers', Importer);
    cmsRoutes.customRoute('POST', '{id}/run', CmsImportsController, 'run', Importer);
};

exports.register.attributes = {
    name: 'importer',
    dependencies: 'batchlog'
};
