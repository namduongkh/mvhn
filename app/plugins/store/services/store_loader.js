'use strict';

import mongoose from "mongoose";
import _ from "lodash";

const Store = mongoose.model('Store');
const Product = mongoose.model('Product');

export default class StoreLoader {
  constructor(request) {
    this.request = request
    this.page = Number(this.request.query.page || 1);
    this.perPage = 4;
  }

  async perform() {
    await this.loadStoreIds();
    let query = { _id: { $in: this.storeIds }, status: 1 };
    let { search } = this.request.query;

    if (search) {
      query.name = { $regex: new RegExp(search, 'gi') };
    }

    return await Store.find(query, 'name slug logo')
      .sort('-createdAt')
      .limit(this.perPage)
      .skip((this.page - 1) * this.perPage)
      .lean();
  }

  async loadStoreIds() {
    this.storeIds = await Product.distinct('store', { status: 1 });
  }
}
