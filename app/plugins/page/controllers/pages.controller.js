'use strict';

import mongoose from "mongoose";
import _, { mean } from "lodash";
import Boom from "boom";
import fs from "fs";
import { BaseController } from "@core/modules";

const Page = mongoose.model('Page');
const PageSection = mongoose.model('PageSection');

export default class PagesController extends BaseController {

    async show() {
        let { slug } = this.request.params;
        let page = await Page.findOne({
            slug,
            status: 1
        }).lean();

        if (!page) {
            if (fs.existsSync(BASE_PATH + '/public/' + slug)) {
                return this.h.file(BASE_PATH + '/public/' + slug);
            } else {
                throw Boom.notFound();
            }
        } else {
            let pageSections;
            let meta = Object.assign({ title: page.title }, page.meta)
            let layout = 'layout';

            if (meta.landingPage) {
                pageSections = await PageSection.find({ page: page._id }).lean();
            }

            let subPage = this.request.params.subPage || 'index';
            let template = 'page/views/show.html';
            if (meta.landingPage) template = 'page/views/show-landing-page.html';
            if (page.template) {
                template = `page/views/templates/${page.template}/${subPage}.html`;
                layout = 'layout-page-template'
            }

            return this.h.view(template, {
                page,
                pageSections,
                meta,
                subPage,
                template: page.layoutTemplate
            }, { layout });
        }
    }

    async templateassets() {
        return this.h.file(BASE_PATH + '/app/plugins/page/views/templates/' + this.request.params.template + '/assets/' + this.request.params.filePath);
    }

    async landingpage() {
        return this.h.view('page/views/landingpage.html', {}, { layout: false });
    }
}
