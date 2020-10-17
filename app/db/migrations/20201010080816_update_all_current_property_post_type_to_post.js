import mongoose from 'mongoose';

const Property = mongoose.model('Property');

export default class UpdateAllCurrentPropertyPostTypeToPost {
  async up() {
    // Do something
    await Property.updateMany({ status: 1 }, { postType: 'post' })
  }

  async down() {
    // Revert do something
  }
}
