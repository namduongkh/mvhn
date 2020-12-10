import mongoose from 'mongoose';
import _ from 'lodash';
import UserCreator from "@plugins/user/services/user_creator.js";

const UserGroup = mongoose.model('UserGroup');
const UserRight = mongoose.model('UserRight');
const User = mongoose.model('User');

export default class DefaultPermitForAdmin {
  async up() {
    let right = await UserRight.findOne({
      name: 'Default permit for admin'
    }) || new UserRight({
      name: 'Default permit for admin',
      controller: '.*',
      action: '.*'
    });
    await right.save();

    let adminGroup = await UserGroup.findOne({
      slug: 'admin'
    }) || new UserGroup({ name: 'Admin', slug: 'admin' });
    adminGroup.allowedRights = [right._id];
    await adminGroup.save();

    let adminUser = await User.findOne({
      email: 'admin@admin.com'
    })

    if (adminUser) {
      adminUser.roles = ['admin'];
      await adminUser.save();
    } else {
      await new UserCreator({
        email: 'admin@admin.com',
        password: 'Qwerty123!',
        cfpassword: 'Qwerty123!',
        roles: ['admin']
      }).perform();
    }
  }

  async down() {
    // Revert do something
  }
}
