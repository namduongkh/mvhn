'use strict';

import _ from 'lodash';
import mongoose from 'mongoose';
import { ResourcesController } from "@core/modules";
import QueueService from "@core/services/queue_service";

const Property = mongoose.model('Property');
const CrawlTemplate = mongoose.model('CrawlTemplate');

export default class CmsCrawlTemplatesController extends ResourcesController {
  async create() {
    await this.createTags();
    await this.createCategory();
    return await super.create();
  }

  async update() {
    await this.createTags();
    await this.createCategory();
    return await super.update();
  }

  async createTags() {
    try {
      let tags = this.request.payload.tags;
      if (!tags || !tags.length) return;

      let oldTags = [];
      let customTags = [];
      for (let i in tags) {
        if (!mongoose.Types.ObjectId.isValid(tags[i])) {
          customTags.push(tags[i]);
        } else {
          oldTags.push(tags[i]);
        }
      }
      let newTags = [];

      for (let i in customTags) {
        let tag = await Property.findByIdAndTypeOrCreate(customTags[i], 'tag');
        newTags.push(tag._id);
      }

      this.request.payload.tags = [...oldTags, ...newTags];
    } catch (error) {
      console.log(error);
    }
  }

  async createCategory() {
    try {
      let category = this.request.payload.category;
      if (!category || (!category.includes(" ") && mongoose.Types.ObjectId.isValid(category))) return;

      category = await Property.findByIdAndTypeOrCreate(category, 'category');

      this.request.payload.category = category._id;
    } catch (error) {
      console.log(error);
    }
  }

  async fetchUrl() {
    let template = await CrawlTemplate.findById(this.request.params.id);

    return await template.fetchUrl();
  }

  async run() {
    QueueService.getInstance().performAction(async () => {
      let template = await CrawlTemplate.findById(this.request.params.id).lean();
      let { CrawlerRunner } = this.request.server.plugins['crawler'];
      let runner = new CrawlerRunner(template.crawler, _.extend(template, this.request.payload));
      runner.perform();
    });

    return { status: 1, message: 'Process is running in background!' };
  }
}
