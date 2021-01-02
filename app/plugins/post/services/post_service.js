'use strict';
import mongoose from "mongoose";
const Post = mongoose.model('Post');
import _ from "lodash";

export default {
  loadPost: async function (request, options = {}) {
    let id = request.params.id || request.query.id;
    let slug = request.params.slug || request.query.slug;

    let query = {};

    if (id) {
      if (mongoose.Types.ObjectId.isValid(id)) {
        query._id = id;
      } else {
        query.slug = id;
      }
    } else if (slug) {
      query.slug = slug
    }

    options = _.merge(options, {
      lean: false,
      filter: query
    });

    let postPromise = Post.findOne({
      ...options.filter
    }).populate('category');

    if (options.lean) {
      postPromise = postPromise.lean();
    }

    if (options.populates && options.populates.length) {
      for (let i in options.populates) {
        postPromise = postPromise.populate(options.populates[i]);
      }
    }

    return await postPromise;
  }
}
