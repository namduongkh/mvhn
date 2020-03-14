import mongoose from 'mongoose';

const Setting = mongoose.model('Setting');

export default class AddSocialLinkToSetting {
  async up() {
    let globalSetting = await Setting.findOne({ key: 'global_setting' });
    globalSetting.fields.push({
      name: 'Social Links',
      key: 'socialLinks',
      type: 'table',
      columns: [{
        name: 'Label',
        key: 'label',
        type: 'text'
      }, {
        name: 'Href',
        key: 'href',
        type: 'text'
      }]
    });
    await globalSetting.save();
  }

  async down() {
    // Revert do something
  }
}
