"use strict";

import Vue from 'vue';
import Axios from 'axios';
import VueCookie from 'vue-cookie';

Vue.use(VueCookie);

export default class AuthService {
  constructor() {
    this.url = window.settings.services.webUrl;
  }

  async loginVerify() {
    return await Axios.get(`${this.url}/api/user/verify-login`, {
      withCredentials: true
    });
  };

  async isLoggedIn() {
    if (Vue.cookie.get(window.cookieKey)) {
      let res = await this.loginVerify();
      return res;
    } else {
      return false;
    }
  };

  login(data) {
    return Axios
      .post(this.url + '/api/user/login', data, {
        withCredentials: true
      });
  };

  register(data) {
    return Axios
      .post(this.url + '/api/user/register', data, {
        withCredentials: true
      });
  };

  account() {
    return Axios
      .get(this.url + '/api/user/account', {
        withCredentials: true
      });
  };

  logout() {
    return Axios
      .get(this.url + '/api/user/logout', {
        withCredentials: true
      })
      .then((res) => {
        Vue.cookie.delete(window.cookieKey);
        if (200 === res.status) return true;
        return false;
      })
      .catch(err => {
        return false;
      });
  };
}

window.authService = new AuthService();
