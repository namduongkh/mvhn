import mongoose from "mongoose";
import _ from "lodash";
import axios from "axios";

const Setting = mongoose.model('Setting');
const User = mongoose.model('User');

export default class FacebookApiService {

  static async request(config = {}, userId = null) {
    let accessToken = await this.accessToken(userId);

    if (!accessToken) {
      return `Not found access token. Please try go to: {WEB_URL}/users/get-facebook-access-token or {WEB_URL}/users/facebook-login`
    }

    config.url = `https://graph.facebook.com/v8.0/${config.url}`;

    config = _.merge(config, {
      method: 'GET',
      params: _.merge(config.params || {}, {
        access_token: accessToken
      })
    });
    console.log('FacebookApiService config:', config);

    try {
      let { data } = await axios.request(config);

      return data;
    } catch (error) {
      console.log('FacebookApiService error:', error);
      return error;
    }
  }

  static async accessToken(userId = null) {
    if (userId) {
      let user = await User.findById(userId).lean();
      if (user.facebookAccessToken) return user.facebookAccessToken;
    }

    let globalSetting = (await Setting.findOne({ key: 'global_setting' }).lean()) || {};
    return globalSetting.facebookAccessToken;
  }
}
