import HapiPassport from './hapi_passport_auth';

export default class GoogleAuthService {
  constructor(server) {
    return new HapiPassport('GoogleStrategy', {
      clientID: server.configManager.get('googleApi.clientId'),
      clientSecret: server.configManager.get('googleApi.clientSecret'),
      callbackURL: server.configManager.get('web.context.settings.services.webUrl') + '/users/google-login-callback'
    }, { scope: ['email', 'profile', 'openid'] });
  }

  static getInstance(server) {
    if (!this.instance) {
      this.instance = new GoogleAuthService(server);
    }
    return this.instance;
  }
}
