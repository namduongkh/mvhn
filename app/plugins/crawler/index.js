'use strict';

import mongoose from 'mongoose';
import CmsCrawlersController from "./controllers/cms_crawlers_controller";
const Crawler = mongoose.model('Crawler');

exports.register = function (server, options, next) {
    const cmsRoutes = new Routes(server);
    cmsRoutes.resources(CmsCrawlersController, 'crawlers', Crawler)
        .customRoute('POST', '{id}/run', CmsCrawlersController, 'run', Crawler);
};

exports.register.attributes = {
    name: 'crawler'
};
