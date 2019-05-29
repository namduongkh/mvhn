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

      let customTags = tags.filter((tag) => {
        if (!mongoose.Types.ObjectId.isValid(tag)) {
          return tag;
        }
      });

      let that = this;

      return new Promise(async (rs) => {
        let tagIds = [];
        await _.forEach(tags, async (tag) => {
          if (customTags.includes(tag)) {
            tag = await new Property({
              name: tag,
              type: 'tag'
            }).save();
            tagIds.push(tag._id);
          } else {
            tagIds.push(tag);
          }
        });

        that.request.payload.tags = tagIds;
        rs();
      });
    } catch (error) {
      console.log(error);
    }
  }

  async createCategory() {
    try {
      let category = this.request.payload.category;
      if (!category || mongoose.Types.ObjectId.isValid(category)) return;

      category = await new Property({
        name: category,
        type: 'category'
      }).save();

      this.request.payload.category = category._id;
    } catch (error) {
      console.log(error);
    }
  }
}