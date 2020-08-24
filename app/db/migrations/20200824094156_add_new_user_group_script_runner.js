import mongoose from 'mongoose';

const UserGroup = mongoose.model('UserGroup');

export default class AddNewUserGroupScriptRunner {
  async up() {
    // Do something
    let group = new UserGroup({
      name: 'Script Runner',
      slug: 'script-runner'
    });

    await group.save();
  }

  async down() {
    // Revert do something
  }
}
