import mongoose from 'mongoose';

const Setting = mongoose.model('Setting');

export default class AddFacebookAccessTokenSetting {
  async up() {
    // Do something
    let globalSetting = await Setting.findOne({ key: 'global_setting' });
    globalSetting.fields.push({
      name: 'Facebook Access Token',
      key: 'facebookAccessToken',
      type: 'text'
    }, {
      name: 'Facebook Access Scopes',
      key: 'facebookAccessScopes',
      type: 'text'
    });
    await globalSetting.save();
  }

  async down() {
    // Revert do something
  }
}
