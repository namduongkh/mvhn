'use strict';
import mongoose from "mongoose";
const Post = mongoose.model('Post');
import _ from "lodash";

export default {
  loadPost: async function (request, h, options = {}) {
    options = _.merge(options, {
      lean: false,
      filter: {
        _id: request.params.id || request.query.id || { $ne: undefined },
        slug: request.params.slug || request.query.slug || { $ne: undefined },
      }
    });

    let postPromise = Post.findOne({
      ...options.filter
    }).populate('category');

    if (options.lean) {
      postPromise = postPromise.lean();
    }

    return h.response(await postPromise);
  },

  loadCategory: async function (request, h, options = {}) {
    const Property = mongoose.model('Property');

    options = _.merge(options, {
      lean: false,
      filter: {
        _id: request.params.id || request.query.id || { $ne: undefined },
        slug: request.params.slug || request.query.slug || { $ne: undefined },
      }
    });

    let categoryPromise = Property.findOne({
      ...options.filter,
      type: 'category'
    });

    if (options.lean) {
      categoryPromise = categoryPromise.lean();
    }

    return h.response(await categoryPromise);
  }
}