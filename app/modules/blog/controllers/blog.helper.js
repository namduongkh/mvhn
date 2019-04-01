'use strict';
import mongoose from "mongoose";
const Blog = mongoose.model('Blog');
import _ from "lodash";

export default {
  async  loadBlog(request, h, options = {}) {
    options = _.merge(options, {
      lean: false,
      filter: {
        _id: request.params.id || request.query.id || { $ne: undefined },
        slug: request.params.slug || request.query.slug || { $ne: undefined },
      }
    });
    if (options.lean) {
      return reply(await Blog.findOne({
        ...options.filter
      }).lean());
    } else {
      return reply(await Blog.findOne({
        ...options.filter
      }));
    }
  }
}