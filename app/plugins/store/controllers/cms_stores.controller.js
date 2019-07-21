import mongoose from "mongoose";

const Store = mongoose.model('Store');

export default class CmsStoresController extends ResourcesController {
  async mystore() {
    let { credentials } = this.request.auth;
    let store = await Store.findOne({
      owner: credentials.uid
    }, "_id").lean();

    if (store) {
      this.request.params = { id: store._id };
      return await this.edit();
    } else {
      return await this.new();
    }
  }
}