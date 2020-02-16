'use strict';
import Vue from "vue";
import vi from 'vee-validate/dist/locale/vi';
import VeeValidate, { Validator } from "vee-validate";
import AuthPanel from "./AuthPanel";
import LoginForm from "./LoginForm";
import VuexConfig from "@/core/views/vuex/vuex_config";

if ($('#auth-panel') && $('#auth-panel').length) {
  Validator.localize('vi', vi);
  Vue.use(VeeValidate, {
    locale: 'vi'
  });

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

  Validator.localize('vi', vi);
  Vue.use(VeeValidate, {
    locale: 'vi'
  });

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
