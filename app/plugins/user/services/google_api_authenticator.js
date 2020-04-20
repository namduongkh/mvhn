const { google } = require('googleapis');
import mongoose from "mongoose";

const Setting = mongoose.model('Setting');

export default class GoogleApiAuthenticator {

  constructor(request, h) {
    this.request = request;
    this.h = h;
    this.server = this.request.server;
    this.oAuth2Client = new google.auth.OAuth2(
      this.server.configManager.get('googleApi.clientId'),
      this.server.configManager.get('googleApi.clientSecret'),
      this.server.configManager.get('web.context.settings.services.webUrl') + '/users/get-google-access-token'
    );
  }

  async perform() {
    this.globalSetting = (await Setting.findOne({ key: 'global_setting' }).lean()) || {};
    this.scopes = (this.globalSetting.googleAccessScopes || "").split(",").map((i) => { return i.trim() });

    if (this.request.query.code) {
      let token = await this.getAccessToken();

      this.globalSetting.googleAccessToken = token || this.globalSetting.googleAccessToken;
      await Setting.findByIdAndUpdate(this.globalSetting._id, this.globalSetting, { new: true });
      return this.h.redirect(this.server.configManager.get('web.context.settings.services.cmsUrl') + '/#/settings/' + this.globalSetting._id);
    } else {
      let url = await this.authenticateUrl();
      return this.h.redirect(url);
    }
  }

  async authenticateUrl() {
    return this.oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      prompt: 'consent',
      scope: this.scopes
    });
  }

  async getAccessToken() {
    return new Promise((rs) => {
      this.oAuth2Client.getToken(this.request.query.code, (err, token) => {
        if (err) return console.error('Error retrieving access token', err);
        rs(JSON.stringify(token));
      });
    });
  }
}
