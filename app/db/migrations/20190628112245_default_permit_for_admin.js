import mongoose from 'mongoose';
import _ from 'lodash';

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
    }) || new UserGroup({
      name: 'Admin',
      slug: 'admin'
    });
    adminGroup.allowedRights = [right._id];
    await adminGroup.save();

    let adminUser = await User.findOne({
      username: 'admin'
    }) || new User({
      username: 'admin'
    });
    adminUser = _.extend(adminUser, {
      name: 'Admin',
      roles: ['admin'],
      email: 'admin@mvhn.mvhn'
    });
    adminUser.password = await adminUser.hashPassword('admin@mvhn.mvhn');;
    await adminUser.save();
  }

  async down() {
    // Revert do something
  }
}
