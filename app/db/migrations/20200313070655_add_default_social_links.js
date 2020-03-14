import mongoose from 'mongoose';

const Setting = mongoose.model('Setting');

export default class AddDefaultSocialLinks {
  async up() {
    let globalSetting = await Setting.findOne({ key: 'global_setting' }).lean();

    globalSetting.socialLinks = (globalSetting.socialLinks || []).concat([
      { label: '<i class="fab fa-facebook"></i>', href: '' },
      { label: '<i class="fab fa-twitter"></i>', href: '' },
      { label: '<i class="fab fa-google-plus"></i>', href: '' },
      { label: '<i class="fab fa-pinterest"></i>', href: '' }
    ]);

    await Setting.findByIdAndUpdate(globalSetting._id, globalSetting, { new: true });
  }

  async down() {
    // Revert do something
  }
}
