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
      <AuthPanel></AuthPanel>
    `
  });
}

if ($('#users_login') && $('#users_login').length) {
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
      <LoginForm url="/"></LoginForm>
    `
  });
}
