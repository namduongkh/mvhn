import Base from './base';
import mongoose from "mongoose";
import _ from "lodash";

const Store = mongoose.model('Store');
const StoreMenu = mongoose.model('StoreMenu');

export default class StoreMenuImporter extends Base {
  async run() {
    await this.loadStore();

    if (this.store) {
      await this.eachRow(async (row, total) => {
        await this.importRecord(row);
        this.batchlog.progress += 100 / total;
        this.batchlog = await this.batchlog.save();
      });

      this.batchlog.progress = 100;
      this.batchlog = await this.batchlog.save();

      this.batchlog.setStatus('success');
    } else {
      this.batchlog.log("Please provide store id");
      this.batchlog.setStatus('error');
    }
  }

  async importRecord(object) {
    let storeMenu;

    if (this.params.replaceByName) storeMenu = await StoreMenu.findOne({ name: object['Name'], store: this.store._id });
    if (!storeMenu) storeMenu = new StoreMenu({ name: object['Name'], store: this.store._id });

    storeMenu = _.extendWith(storeMenu, {
      name: object['Name'],
      price: object['Price'],
      image: object['Image'],
      store: this.store._id,
      status: object['Status']
    }, (objValue, srcValue) => {
      return srcValue || objValue;
    });

    await storeMenu.save();

    return storeMenu;
  }

  async loadStore() {
    if (this.params.storeId) {
      this.store = await Store.findById(this.params.storeId);
    }
  }
}
