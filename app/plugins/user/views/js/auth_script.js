'use strict';
import Vue from "vue";
import AuthPanel from "./AuthPanel";
import LoginForm from "./LoginForm";
import SocialLoginProcessor from "./SocialLoginProcessor";
import VuexConfig from "@/core/views/vuex/vuex_config";

if ($('#auth-panel') && $('#auth-panel').length) {
  new Vue({
    el: '#auth-panel',
    store: new VuexConfig(['user']).toVuexStore(),
    components: {
      AuthPanel
    },
    template: `
      <AuthPanel :lazyMode="${$('#auth-panel').data('lazy-mode')}"></AuthPanel>
    `
  });
}

if ($('#users_login') && $('#users_login').length) {
  let afterLoginUrl = $('#users_login').data('url') || '/';

  new Vue({
    el: '#users_login',
    store: new VuexConfig(['user']).toVuexStore(),
    components: {
      LoginForm
    },
    template: `
      <LoginForm url="${afterLoginUrl}"></LoginForm>
    `
  });
}

if ($('#social_login_processing') && $('#social_login_processing').length) {
  let token = $('#social_login_processing').data('token');

  new Vue({
    el: '#social_login_processing',
    store: new VuexConfig(['user']).toVuexStore(),
    components: {
      SocialLoginProcessor
    },
    template: `
      <SocialLoginProcessor token="${token}"></SocialLoginProcessor>
    `
  });
}
