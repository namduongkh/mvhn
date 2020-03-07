import mongoose from 'mongoose';

const Importer = mongoose.model('Importer');

export default class AddStoreProductImporter {
  async up() {
    // Do something
    let importer = new Importer({
      name: 'Store Product Import',
      classname: 'StoreProductImporter',
      params: [{
        name: 'Replace By Name',
        key: 'replaceByName',
        type: 'checkbox'
      }]
    });

    await importer.save();
  }

  async down() {
    // Revert do something
  }
}
