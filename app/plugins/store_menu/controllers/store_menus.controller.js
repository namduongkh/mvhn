'use strict';

import mongoose from "mongoose";
import _ from "lodash";

const StoreMenu = mongoose.model('StoreMenu');

export default class StoreMenusController extends BaseController {

  async index() {
    let { storeId } = this.request.params;
    this.request.query = _.merge(this.request.query || {}, { store: storeId });
    let resp = await new ResourcesController(StoreMenu, this.request, this.h).index();
    return resp;
  }
}
