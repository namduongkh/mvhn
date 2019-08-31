'use strict';
import Axios from "axios";
import Vue from "vue";
import vi from 'vee-validate/dist/locale/vi';
import VeeValidate, { Validator } from "vee-validate";
import AuthPanel from "./AuthPanel";

if ($('#auth-panel') && $('#auth-panel').length) {
  Validator.localize('vi', vi);
  Vue.use(VeeValidate, {
    locale: 'vi'
  });
  
  new Vue({
    el: '#auth-panel',
    components: {
      AuthPanel
    },
    template: `
      <AuthPanel></AuthPanel>
    `
  });
}
