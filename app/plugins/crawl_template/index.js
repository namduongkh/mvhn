'use strict';

import mongoose from 'mongoose';
import CmsCrawlTemplatesController from './controllers/cms_crawl_templates_controller.js';
import { Routes } from "@core/modules";

const CrawlTemplate = mongoose.model('CrawlTemplate');

exports.register = function (server, options, next) {
    const cmsRoutes = new Routes(server);
    cmsRoutes.resources(CmsCrawlTemplatesController, 'crawl_templates', CrawlTemplate)
        .customRoute('POST', '{id}/run', CmsCrawlTemplatesController, 'run', CrawlTemplate)
        .customRoute('GET', '{id}/fetch_url', CmsCrawlTemplatesController, 'fetchUrl', CrawlTemplate);
};

exports.register.attributes = {
    name: 'crawl_template'
};
