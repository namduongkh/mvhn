import mongoose from 'mongoose';
import _ from 'lodash';

const Setting = mongoose.model('Setting');

export default class AddDefaultGlobalSetting {
  async up() {
    // Do something
    let setting = await Setting.findOne({
      key: 'global_setting'
    }) || new Setting({
      key: 'global_setting',
    });

    setting = _.extend(setting, {
      name: 'Global Setting',
      fields: [
        {
          key: "title",
          name: "Title",
          type: "text"
        },
        {
          key: "description",
          name: "Description",
          type: "text"
        },
        {
          key: "image",
          name: "Share Image",
          type: "image"
        },
        {
          key: "allowSendEmail",
          name: "Allow Send Email",
          type: "boolean"
        },
        {
          key: "allowSendSms",
          name: "Allow Send SMS",
          type: "boolean"
        },
        {
          key: "logo",
          name: "Logo Image",
          type: "image"
        },
        {
          key: "logoText",
          name: "Logo Text",
          type: "text"
        },
      ]
    });

    await setting.save();
  }

  async down() {
    // Revert do something
  }
}