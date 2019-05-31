'use strict';
import mongoose from "mongoose";
const Product = mongoose.model('Product');
import _ from "lodash";

export default {
  loadProduct: async function (request, options = {}) {
    options = _.merge(options, {
      lean: false,
      filter: {
        _id: request.params.id || request.query.id || { $ne: undefined },
        slug: request.params.slug || request.query.slug || { $ne: undefined },
      }
    });

    let productPromise = Product.findOne({
      ...options.filter
    }).populate('category');

    if (options.lean) {
      productPromise = productPromise.lean();
    }

    if (options.populates && options.populates.length) {
      for (let i in options.populates) {
        productPromise = productPromise.populate(options.populates[i]);
      }
    }

    return await productPromise;
  }
}