import ResourcesController from "../../cms/controllers/resources.controller";
import _ from 'lodash';
import mongoose from 'mongoose';

const Property = mongoose.model('Property');

export default class CmsPostsController extends ResourcesController {
  async create() {
    await this.createTags();
    return await super.create();
  }

  async update() {
    await this.createTags();
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
}