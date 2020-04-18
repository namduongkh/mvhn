import mongoose from 'mongoose';

const Setting = mongoose.model('Setting');

export default class AddGoogleAccessTokenToSetting {
  async up() {
    // Do something
    let globalSetting = await Setting.findOne({ key: 'global_setting' });
    globalSetting.fields.push({
      name: 'Google Access Token',
      key: 'googleAccessToken',
      type: 'text'
    }, {
      name: 'Google Access Scopes',
      key: 'googleAccessScopes',
      type: 'text'
    });
    await globalSetting.save();
  }

  async down() {
    // Revert do something
  }
}
