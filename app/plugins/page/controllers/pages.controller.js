'use strict';

import mongoose from "mongoose";
import _ from "lodash";
import Boom from "boom";
import fs from "fs";
import { BaseController } from "@core/modules";

const Page = mongoose.model('Page');

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
            return this.h.view('page/views/show.html', {
                page
            });
        }
    }

    async landingpage() {
        return this.h.view('page/views/landingpage.html', {}, { layout: false });
    }
}
