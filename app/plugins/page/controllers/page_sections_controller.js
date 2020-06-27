'use strict';

import mongoose from "mongoose";
import _ from "lodash";
import Boom from "boom";
import fs from "fs";
import { BaseController } from "@core/modules";

const PageSection = mongoose.model('PageSection');

export default class PageSectionsController extends BaseController {

  async new() {
    return this.h.view('page/views/page_section.html', {}, { layout: 'layout-blank' });
  }

  async create() {
    let section = new PageSection(this.request.payload);
    await section.save();
    return section;
  }

  async show() {
    let section = await PageSection.findById(this.request.params.id);

    if (this.request.isXhrRequest) {
      return section;
    } else {
      return this.h.view('page/views/page_section.html', {
        section
      }, { layout: 'layout-blank' });
    }
  }

  async update() {
    let section = await PageSection.findById(this.request.params.id);
    section = _.extend(section, this.request.payload);
    await section.save();
    return section;
  }
}
