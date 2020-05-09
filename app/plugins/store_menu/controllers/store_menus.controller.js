'use strict';

import mongoose from "mongoose";
import _ from "lodash";
import { BaseController } from "@core/modules";
import { ResourcesController } from "@core/modules";

const StoreMenu = mongoose.model('StoreMenu');

export default class StoreMenusController extends BaseController {

  async index() {
    let { storeId } = this.request.params;
    this.request.query = _.merge(this.request.query || {}, {
      store: storeId,
      notPaginate: true,
      sort: 'name|asc',
    });
    let resp = await new ResourcesController(StoreMenu, this.request, this.h).index();
    return resp;
  }

  async getFromProduct() {
    let { storeId } = this.request.params;
    let { productId } = this.request.query;

    return await StoreMenu.getFromProduct(productId);
  }
}
