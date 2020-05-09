'use strict';

import _ from 'lodash';
import mongoose from 'mongoose';
import axios from "axios";
import cheerio from "cheerio";
import { ResourcesController } from "@core/modules";

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
    let template = await CrawlTemplate.findById(this.request.params.id).lean();

    let {
      url,
      urlPattern
    } = template;

    try {
      let resp = await axios.get(url);
      const $ = cheerio.load(resp.data);

      let urlRegex = new RegExp(urlPattern, 'gi');
      let ignoreRegex = new RegExp('#.+$', 'gi');

      let links = $('body a').filter(function () {
        let href = $(this).attr('href');
        return urlRegex.test(href) && !ignoreRegex.test(href);
      }).map(function () {
        return $(this).attr('href');
      }).get();

      return _.uniq(links);
    } catch (error) {
      return [];
    }
  }

  async run() {
    let template = await CrawlTemplate.findById(this.request.params.id).lean();
    let { CrawlerRunner } = this.request.server.plugins['crawler'];

    let runner = new CrawlerRunner(template.crawler, _.extend(template, this.request.payload));
    runner.perform();

    return true;
  }
}
