import mongoose from 'mongoose';
import _ from 'lodash';

const Setting = mongoose.model('Setting');

export default class AddDefaultSettingPost {
  async up() {
    let setting = await Setting.findOne({
      key: 'post_type'
    }) || new Setting({
      name: 'Post Type',
      key: 'post_type',
      isSystem: true
    });
    await setting.save();
    await Setting.findByIdAndUpdate(setting._id, {
      allowedTypes: ['post'],
      postName: 'Post'
    }, { new: true });
  }

  async down() {
    // Revert do something
  }
}
