import mongoose from "mongoose";
import _ from "lodash";
import { ResourcesController } from "@core/modules";

const StoreMenu = mongoose.model('StoreMenu');

export default class CmsStoreMenusController extends ResourcesController {
  async index() {
    this.request.query.product = { $exists: false };

    return await super.index();
  }
}
