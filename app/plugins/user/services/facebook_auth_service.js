import HapiPassport from './hapi_passport_auth';

export default class FacebookAuthService {
  constructor(server, scope = ['public_profile', 'email', 'user_posts', 'user_photos'], callbackURL = 'facebook-login-callback') {
    return new HapiPassport('FacebookStrategy', {
      clientID: server.configManager.get('facebookApi.apiKey'),
      clientSecret: server.configManager.get('facebookApi.secretKey'),
      callbackURL: server.configManager.get('web.context.settings.services.webUrl') + '/users/' + callbackURL
    }, { scope });
  }

  static getInstance(server) {
    if (!this.instance) {
      this.instance = new FacebookAuthService(server);
    }
    return this.instance;
  }
}
