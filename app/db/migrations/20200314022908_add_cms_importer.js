import mongoose from 'mongoose';

const Importer = mongoose.model('Importer');

export default class AddCmsImporter {
  async up() {
    let importer = new Importer({
      name: 'CMS Model Import',
      classname: 'CmsImporter'
    });

    await importer.save();
  }

  async down() {
    // Revert do something
  }
}
