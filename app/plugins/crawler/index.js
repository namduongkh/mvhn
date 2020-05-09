'use strict';

import mongoose from 'mongoose';
import CmsCrawlersController from "./controllers/cms_crawlers_controller";
import CrawlerRunner from "./services/crawler_runner";
import { Routes } from "@core/modules";

const Crawler = mongoose.model('Crawler');

exports.register = function (server, options, next) {
    const cmsRoutes = new Routes(server);
    cmsRoutes.resources(CmsCrawlersController, 'crawlers', Crawler)
        .customRoute('POST', '{id}/test', CmsCrawlersController, 'test', Crawler);

    server.expose('CrawlerRunner', CrawlerRunner);
};

exports.register.attributes = {
    name: 'crawler'
};
