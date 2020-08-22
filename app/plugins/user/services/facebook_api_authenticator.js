import FacebookAuthService from "./facebook_auth_service";
import mongoose from "mongoose";

const Setting = mongoose.model('Setting');

export default class FacebookApiAuthenticator {

  constructor(request, h) {
    this.request = request;
    this.h = h;
    this.server = this.request.server;
  }

  async perform() {
    this.globalSetting = (await Setting.findOne({ key: 'global_setting' }).lean()) || {};
    this.scopes = (this.globalSetting.facebookAccessScopes || "").split(",").map((i) => { return i.trim() });

    this.authService = new FacebookAuthService(this.request.server, this.scopes, 'get-facebook-access-token');

    if (this.request.query.code) {
      let token = await this.getAccessToken();

      this.globalSetting.facebookAccessToken = token || this.globalSetting.facebookAccessToken;
      await Setting.findByIdAndUpdate(this.globalSetting._id, this.globalSetting, { new: true });
      return this.h.redirect(this.server.configManager.get('web.context.settings.services.cmsUrl') + '/#/settings/' + this.globalSetting._id);
    } else {
      return await this.redirectToLogin();
    }
  }

  async redirectToLogin() {
    let self = this;
    let promise = new Promise(function (rs) {
      self.authService.authenticate(self.request, (url) => {
        rs(url);
      });
    });
    let url = await promise;

    return this.h.redirect(url);
  }

  async getAccessToken() {
    let self = this;
    let promise = new Promise(function (rs) {
      self.authService.authenticateCallBack(self.request, async (err, data) => {
        if (err) {
          console.log(err);
          rs();
        } else {
          let { accessToken } = data;
          rs(accessToken);
        }
      })
    });

    return await promise;
  }
}
