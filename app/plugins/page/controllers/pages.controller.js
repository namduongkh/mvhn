'use strict';

import mongoose from "mongoose";
import _ from "lodash";
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
            if (page.landingPage) {
                pageSections = await PageSection.find({ page: page._id }).lean();
            }

            return this.h.view(page.landingPage ? 'page/views/show-landing-page.html' : 'page/views/show.html', {
                page,
                pageSections
            });
        }
    }

    async landingpage() {
        return this.h.view('page/views/landingpage.html', {}, { layout: false });
    }
}
