import HapiPassport from './hapi_passport_auth';

export default class FacebookAuthService {
  constructor(server) {
    return new HapiPassport('FacebookStrategy', {
      clientID: server.configManager.get('facebookApi.apiKey'),
      clientSecret: server.configManager.get('facebookApi.secretKey'),
      callbackURL: server.configManager.get('web.context.settings.services.webUrl') + '/users/facebook-login-callback'
    }, { scope: ['public_profile', 'email'] });
  }

  static getInstance(server) {
    if (!this.instance) {
      this.instance = new FacebookAuthService(server);
    }
    return this.instance;
  }
}
