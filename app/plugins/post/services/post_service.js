'use strict';
import mongoose from "mongoose";
const Post = mongoose.model('Post');
import _ from "lodash";

export default {
  loadPost: async function (request, options = {}) {
    let id = request.params.id || request.query.id;
    let slug = request.params.slug || request.query.slug;

    let query = {};

    if (id && mongoose.Types.ObjectId.isValid(id)) {
      query._id = id;
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
  },

  loadCategory: async function (request, options = {}) {
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
      status: 1,
      type: 'category'
    });

    if (options.lean) {
      categoryPromise = categoryPromise.lean();
    }

    return await categoryPromise;
  },

  loadTag: async function (request, options = {}) {
    const Property = mongoose.model('Property');

    options = _.merge(options, {
      lean: false,
      filter: {
        _id: request.params.id || request.query.id || { $ne: undefined },
        slug: request.params.slug || request.query.slug || { $ne: undefined },
      }
    });

    let tagPromise = Property.findOne({
      ...options.filter,
      status: 1,
      type: 'tag'
    });

    if (options.lean) {
      tagPromise = tagPromise.lean();
    }

    return await tagPromise;
  }
}