'use strict';

import Vue from "vue";
import VuexConfig from "../vuex/vuex_config"
import Helpers from "@Utils/application_helper";
import { Datetime } from 'vue-datetime';
import { Settings } from 'luxon'
import vi from 'vee-validate/dist/locale/vi';
import VeeValidate, { Validator } from 'vee-validate';
import Navigator from "./Navigator";
import select2 from "@CmsCore/vue/components/select2.vue";
import ImageAsAvatar from "@CmsCore/vue/components/ImageAsAvatar.vue";
import FieldEditor from "@CmsCore/vue/components/FieldEditor.vue";

for (let prop in Helpers) Vue.filter(`${prop}`, Helpers[prop]);

$(function () {
  $('[href^="#"]').each(function () {
    this.pathname = window.location.pathname;
  });
});

Vue.component('datetime', Datetime);
Vue.component('select2', select2);
Vue.component('ImageAsAvatar', ImageAsAvatar);
Vue.component('FieldEditor', FieldEditor);

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

if ($('[data-navigator]') && $('[data-navigator]').length) {
  new Vue({
    el: '[data-navigator]',
    template: '<Navigator></Navigator>',
    store: new VuexConfig(['core']).toVuexStore(),
    components: {
      Navigator
    }
  });
}
