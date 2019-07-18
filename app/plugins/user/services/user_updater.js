import mongoose from "mongoose";
import AuthUtil from "../util/auth";
import _ from "lodash";

const User = mongoose.model('User');

export default class UserUpdater {
  constructor(user, payload) {
    this.payload = payload;
    this.user = user
    this.error;
  }

  async perform() {
    if (!this.validConfirmPassword()) return false;
    if (!(await this.validUniqueField('email', 'Email'))) return false;
    if (!(await this.validUniqueField('phone', 'Phone'))) return false;

    delete this.payload.cfpassword;
    this.payload.email = (String(this.payload.email)).toLowerCase();
    let auth = new AuthUtil({});
    let that = this;

    if (this.payload.password) {
      this.payload.password = await auth.hashPassword(this.payload.password);
      this.payload.activeToken = auth.getRandomString(20);
    }

    this.user = _.extend(this.user, this.payload);
    try {
      let user = await this.user.save();
      return user;
    } catch (error) {
      this.error = error;
      return false;
    }
  }

  validConfirmPassword() {
    let { password, cfpassword } = this.payload;
    if (password != cfpassword) {
      this.error = "Confirm password is not correct!";
      return false;
    }
    return true;
  }

  async validUniqueField(field, name = '') {
    let user = await User.findOne({ [field]: this.payload[field], _id: { $ne: this.payload._id } }, '_id').lean();
    if (user) {
      this.error = (name || field) + " have already exists!";
      return false;
    }
    return true;
  }
}