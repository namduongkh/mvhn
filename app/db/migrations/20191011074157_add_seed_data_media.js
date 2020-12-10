import mongoose from 'mongoose';
import _ from 'lodash';

const Media = mongoose.model('Media');

export default class AddSeedDataMedia {
  async up() {
    // Do something
    let media = await Media.findOne().lean();
    if (!media) return;

    for (let i = 0; i < 100; i++) {
      let newMedia = new Media(_.omit(media, '_id'));
      await newMedia.save();
    }
  }

  async down() {
    // Revert do something
  }
}
