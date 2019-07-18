import mongoose from 'mongoose';
import _ from 'lodash';

const UserGroup = mongoose.model('UserGroup');
const UserRight = mongoose.model('UserRight');
const User = mongoose.model('User');

export default class DefaultPermitForAdmin {
  async up() {
    let right = new UserRight({
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
    });
    adminUser.roles = ['admin'];
    await adminUser.save();
  }

  async down() {
    // Revert do something
  }
}