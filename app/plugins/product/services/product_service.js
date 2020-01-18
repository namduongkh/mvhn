'use strict';
import mongoose from "mongoose";
const Product = mongoose.model('Product');
import _ from "lodash";

export default {
  loadProduct: async function (request, options = {}) {
    let id = request.params.id || request.query.id;
    let filter = { _id: { $ne: undefined }, slug: { $ne: undefined } };

    if (id) {
      if (mongoose.Types.ObjectId.isValid(id)) {
        filter._id = id;
      } else {
        filter.slug = id;
      }
    }

    options = _.merge(options, {
      lean: false,
      filter
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
