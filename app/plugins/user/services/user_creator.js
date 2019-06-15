import mongoose from "mongoose";
import AuthUtil from "../util/auth";

const User = mongoose.model('User');

export default class UserCreator {
  constructor(payload) {
    this.payload = payload;
    this.error;
  }

  async perform() {
    if (!this.validConfirmPassword()) return false;
    if (!(await this.validUniqueField('email', 'Email'))) return false;
    if (!(await this.validUniqueField('phone', 'Phone'))) return false;

    delete this.payload.cfpassword;
    this.payload.provider = 'local';
    this.payload.email = (String(this.payload.email)).toLowerCase();

    let user = new User(this.payload);
    let auth = new AuthUtil({});
    let that = this;

    return auth
      .hashPassword(this.payload.password)
      .then(hash => {
        user.password = hash;
        user.activeToken = auth.getRandomString(20);
        return user.save();
      })
      .then(user => {
        return user.toObject();
      })
      .catch(err => {
        console.log('err', err);
        that.error = err;
        return false;
      });
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
    let user = await User.findOne({ [field]: this.payload[field] }, '_id').lean();
    if (user) {
      this.error = (name || field) + " have already exists!";
      return false;
    }
    return true;
  }
}