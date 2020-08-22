import FacebookAuthService from "../services/facebook_auth_service";
import GoogleAuthService from "../services/google_auth_service";
import GoogleApiAuthenticator from "../services/google_api_authenticator";
import FacebookApiAuthenticator from "../services/facebook_api_authenticator";
import mongoose from "mongoose";
import axios from "axios";
import _ from "lodash";
import AuthUtil from "../util/auth";
import { BaseController } from "@core/modules";

const Setting = mongoose.model('Setting');
const User = mongoose.model('User');

export default class UsersController extends BaseController {
  async login() {
    return this.view('user/views/login', {
      url: this.request.query.url,
      template: 'webmag',
      enableLazyRegister: false
    });
  }

  async facebookLogin() {
    let that = this;
    let promise = new Promise(function (rs) {
      FacebookAuthService.getInstance(that.request.server).authenticate(that.request, (url) => {
        rs(url);
      });
    })
    let url = await promise;
    return this.h.redirect(url);
  }

  async facebookLoginCallback() {
    let that = this;
    let cookieOptions = that.request.server.configManager.get('web.cookieOptions');
    let promise = new Promise(function (rs) {
      FacebookAuthService.getInstance(that.request.server).authenticateCallBack(that.request, async (err, data) => {
        if (err) {
          console.log(err);
          rs();
        } else {
          let { accessToken } = data;

          axios.get('https://graph.facebook.com/v6.0/me', {
            params: {
              fields: 'name,email,picture.type(large)',
              access_token: accessToken
            }
          }).then(async ({ data }) => {
            let user = await User.findOne({
              $or: [
                { facebookId: data.id },
                { email: data.email },
              ]
            }) || new User({
              facebookId: data.id,
              email: data.email,
            });
            user = _.extend(user, {
              name: data.name,
              username: data.email,
              avatar: data.picture && data.picture.data && data.picture.data.url,
              facebookId: data.id,
              facebookAccessToken: accessToken
            });
            user = await user.save();

            let token = await (new AuthUtil(that.request.server)).loginWithoutPass(user.email, user);
            rs(token);
          });
        }
      });
    });

    let token = await promise;
    if (token) {
      return this.view('user/views/social_login_processing', {
        token,
        enableLazyRegister: false
      })
        .header("Authorization", token)
        .state(COOKIE_NAME, token, cookieOptions);
    } else {
      return this.h.redirect('/');
    }
  }

  async googleLogin() {
    let url = await new GoogleAuthService(this.request.server).authenticateUrl(this.request);
    return this.h.redirect(url);
  }

  async getGoogleAccessToken() {
    return await new GoogleApiAuthenticator(this.request, this.h).perform();
  }

  async googleLoginCallback() {
    let cookieOptions = this.request.server.configManager.get('web.cookieOptions');
    let data = await new GoogleAuthService(this.request.server).authenticateData(this.request)

    let profile = data.profile || {};
    let email = profile.emails && profile.emails[0] && profile.emails[0].value;
    let photo = profile.photos && profile.photos[0] && profile.photos[0].value;
    let user = await User.findOne({
      $or: [
        { googleId: profile.id },
        { email: email },
      ]
    }) || new User({
      googleId: profile.id,
      email: email,
    });
    user = _.extend(user, {
      name: profile.displayName,
      username: email,
      avatar: photo,
      googleId: profile.id,
    });
    user = await user.save();

    let token = await (new AuthUtil(this.request.server)).loginWithoutPass(user.email, user);

    if (token) {
      return this.view('user/views/social_login_processing', {
        token,
        enableLazyRegister: false
      })
        .header("Authorization", token)
        .state(COOKIE_NAME, token, cookieOptions);
    } else {
      return this.h.redirect('/');
    }
  }

  async getFacebookAccessToken() {
    return await (new FacebookApiAuthenticator(this.request, this.h)).perform();
  }
}
