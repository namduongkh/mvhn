import Base from './base';
import mongoose from "mongoose";
import _ from "lodash";

const Store = mongoose.model('Store');
const Product = mongoose.model('Product');
const Property = mongoose.model('Property');

export default class StoreProductImporter extends Base {
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
    let product;

    if (this.params.replaceByName) product = await Product.findOne({ name: object['Name'], store: this.store._id });
    if (!product) product = new Product({ name: object['Name'], store: this.store._id })

    product = _.extend(product, {
      price: object['Price'],
      rootPrice: object['Root Price'] || object['Price'],
      thumb: object['Image'],
      quantity: object['Quantity'],
      galleries: [object['Gallery 1'], object['Gallery 2'], object['Gallery 3']].filter((i) => { if (i) return true }),
      category: await this.loadCategory(object['Category']),
      unit: object['Unit'],
      type: 'service' == object['Type'] ? 'service' : 'sale',
      content: object['Content']
    });

    try {
      await product.save();
    } catch (error) {
      this.batchlog.log("Save error " + product.name);
    }
  }

  async loadStore() {
    if (this.params.storeId) {
      this.store = await Store.findById(this.params.storeId);
    }
  }

  async loadCategory(name) {
    if (!name) return;

    let category = await Property.findOne({ name, type: 'category' }, '_id').lean();
    if (!category) {
      category = new Property({ name, type: 'category' });
      await category.save();
    }

    return category._id
  }
}
