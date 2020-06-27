import mongoose from 'mongoose';

const Importer = mongoose.model('Importer');

export default class AddParamsToMenuImporter {
  async up() {
    let importer = await Importer.findOne({
      classname: 'StoreMenuImporter'
    })

    importer.params = importer.params || [];
    importer.params.push({
      name: 'Replace By Name',
      key: 'replaceByName',
      type: 'checkbox'
    })

    await importer.save();
  }

  async down() {
    // Revert do something
  }
}
