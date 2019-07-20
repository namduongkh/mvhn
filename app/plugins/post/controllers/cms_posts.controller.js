'use strict';

import _ from 'lodash';
import mongoose from 'mongoose';

const Property = mongoose.model('Property');

export default class CmsPostsController extends ResourcesController {
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
        let tag = await Property.findOne({
          name: customTags[i],
          type: 'tag'
        }).lean() || await new Property({
          name: customTags[i],
          type: 'tag'
        }).save();
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

      category = await Property.findOne({
        name: category,
        type: 'category'
      }).lean() || await new Property({
        name: category,
        type: 'category'
      }).save();

      this.request.payload.category = category._id;
    } catch (error) {
      console.log(error);
    }
  }
}