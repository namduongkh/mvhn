import mongoose from 'mongoose';

const Setting = mongoose.model('Setting');

export default class AddDefaultSettingMenu {
  async up() {
    // Do something
    let globalSetting = await Setting.findOne({ key: 'global_setting' });
    globalSetting.fields.push({
      name: 'Menu',
      key: 'menu',
      type: 'table',
      columns: [{
        name: 'Name',
        key: 'name',
        type: 'text'
      }, {
        name: 'Href',
        key: 'href',
        type: 'text'
      }, {
        name: 'New Tab',
        key: 'newTab',
        type: 'boolean'
      }]
    });
    await globalSetting.save();
  }

  async down() {
    // Revert do something
  }
}