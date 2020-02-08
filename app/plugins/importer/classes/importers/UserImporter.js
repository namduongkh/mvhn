import Base from './base';
import mongoose from "mongoose";
import _ from "lodash";

const bcrypt = require('bcrypt');
const SALT_LENGTH = 9;

const User = mongoose.model('User');

export default class UserImporter extends Base {
  async run() {
    await this.eachRow(async (row, total) => {
      await this.importUser(row);
      this.batchlog.progress += 100 / total;
      this.batchlog = await this.batchlog.save();
    });

    this.batchlog.progress = 100;
    this.batchlog = await this.batchlog.save();

    this.batchlog.setStatus('success');
  }

  async importUser(object) {
    let user = await User.findOne({ email: object['Email'] });

    if (!user) {
      this.batchlog.log('New User');
      user = new User({
        email: object['Email'],
        name: object['Name'],
        username: object['Username'],
        password: await bcrypt.hashAsync(object['Password'] || '123456', SALT_LENGTH)
      });
      user = await user.save();
    }

    return user;
  }
}
