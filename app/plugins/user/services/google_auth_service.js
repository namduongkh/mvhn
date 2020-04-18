import HapiPassport from './hapi_passport_auth';

export default class GoogleAuthService {
  constructor(server, scope = ['email', 'profile', 'openid'], callbackUrl = '/users/google-login-callback') {
    this.server = server;

    this.passport = new HapiPassport('GoogleStrategy', {
      clientID: this.server.configManager.get('googleApi.clientId'),
      clientSecret: this.server.configManager.get('googleApi.clientSecret'),
      callbackURL: this.server.configManager.get('web.context.settings.services.webUrl') + callbackUrl
    }, { scope });
  }

  async authenticateUrl(request = {}) {
    let self = this;

    return new Promise((rs) => {
      self.passport.authenticate(request, (url) => {
        rs(url);
      });
    });
  }

  async authenticateData(request = {}) {
    let self = this;

    return new Promise((rs) => {
      self.passport.authenticateCallBack(request, async (err, data) => {
        if (err) {
          console.log(err);
          rs({});
        } else {
          rs(data);
        }
      });
    });
  }
}
