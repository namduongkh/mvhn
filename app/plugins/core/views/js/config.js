import Vue from "vue";
import Helpers from "@Utils/application_helper";
import { Datetime } from 'vue-datetime';
import { Settings } from 'luxon'
import vi from 'vee-validate/dist/locale/vi';
import VeeValidate, { Validator } from 'vee-validate';

for (let prop in Helpers) Vue.filter(`${prop}`, Helpers[prop]);

$(function () {
  $('[href^="#"]').each(function () {
    this.pathname = window.location.pathname;
  });
});

Vue.component('datetime', Datetime);
Settings.defaultLocale = 'vi';

Validator.localize('vi', vi);
Vue.use(VeeValidate, {
  locale: 'vi',
  events: 'blur',
  delay: 0,
  classes: true,
  classNames: {
    touched: '', // the control has been blurred
    untouched: '', // the control hasn't been blurred
    valid: '', // model is valid
    invalid: 'form-control-error', // model is invalid
    pristine: '', // control has not been interacted with
    dirty: '' // control has been interacted with
  },
  fieldsBagName: 'form_fields'
});
