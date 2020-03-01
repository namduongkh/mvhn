import FacebookAuthService from "../services/facebook_auth_service";
import GoogleAuthService from "../services/google_auth_service";
import mongoose from "mongoose";
import axios from "axios";
import _ from "lodash";
import AuthUtil from "../util/auth";

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
      FacebookAuthService.getInstance(that.request.server).authenticateCallBack(that.request, async (err, accessToken, refreshToken, userData) => {
        if (err) {
          console.log(err);
          rs();
        } else {
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
    let that = this;
    let promise = new Promise(function (rs) {
      GoogleAuthService.getInstance(that.request.server).authenticate(that.request, (url) => {
        rs(url);
      });
    })
    let url = await promise;
    return this.h.redirect(url);
  }

  async googleLoginCallback() {
    let that = this;
    let cookieOptions = that.request.server.configManager.get('web.cookieOptions');
    let promise = new Promise(function (rs) {
      GoogleAuthService.getInstance(that.request.server).authenticateCallBack(that.request, async (err, accessToken, refreshToken, userData) => {
        if (err) {
          console.log(err);
          rs();
        } else {
          // TODO
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
}
