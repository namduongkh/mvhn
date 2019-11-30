import mongoose from "mongoose";
import Boom from "boom";

const Store = mongoose.model('Store');

export default class CmsStoresController extends ResourcesController {

  beforeActions() {
    return {
      checkMyStores: [['index']],
      checkMyStore: [['show'], ['edit'], ['update'], ['delete']]
    }
  }

  async checkMyStores() {
    let { credentials } = this.request.auth;

    if (!credentials.scope.includes('admin')) {
      this.request.query.owner = credentials.uid
    }
  }

  async checkMyStore() {
    let { credentials } = this.request.auth;

    if (!credentials.scope.includes('admin')) {
      let existed = await Store.exists({ owner: credentials.uid, _id: this.request.params.id });

      if (!existed) {
        throw Boom.forbidden("Can not fetch data");
      } else {
        if (this.request.payload) this.request.payload.owner = credentials.uid;
      }
    }
  }
}
