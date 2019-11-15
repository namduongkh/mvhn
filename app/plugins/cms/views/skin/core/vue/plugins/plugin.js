import Vue from 'vue';
import VueCookie from 'vue-cookie';
import VueLocalStorage from 'vue-localstorage';
import VueFroala from 'vue-froala-wysiwyg';
import Datepicker from 'vuejs-datepicker';
import * as Vuetable from 'vuetable-2'
import Listing from './../components/Listing';
import BzJsonEditor from './../components/BzJsonEditor';
import DetailActions from './../components/DetailActions';
import imageUploader from './../components/imageUploader';
import FileBrowser from './../components/FileBrowser';
import FilterLayout from './../components/FilterLayout';
import FieldEditor from './../components/FieldEditor';
import select2 from './../components/select2';
import * as filters from './../filters';
import VueFB from './../configs/_facebook';
import vi from 'vee-validate/dist/locale/vi';
import VeeValidate, { Validator } from 'vee-validate';
import { Slider } from 'vue-color'
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker';

export default {
  install
}

function install() {
  Vue.use(VueFroala);
  Vue.use(VueCookie);
  Vue.use(VueLocalStorage);

  // Vue.use(VueFB, {
  //   appId: window.settings.facebook_app_id || '1382283735152598',
  //   autoLogAppEvents: true,
  //   xfbml: true,
  //   version: 'v2.12'
  // });

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

  /// Components ///
  Vue.component('datepicker', Datepicker);
  Vue.component('vuetable', Vuetable.Vuetable);
  Vue.component('vuetable-pagination', Vuetable.VuetablePagination);
  Vue.component('Listing', Listing);
  Vue.component('BzJsonEditor', BzJsonEditor);
  Vue.component('DetailActions', DetailActions);
  Vue.component('imageUploader', imageUploader);
  Vue.component('select2', select2);
  Vue.component('color-picker', Slider);
  Vue.component('FileBrowser', FileBrowser);
  Vue.component('datetimepicker', VueCtkDateTimePicker);
  Vue.component('FilterLayout', FilterLayout);
  Vue.component('FieldEditor', FieldEditor);

  /// Filters ///
  for (let prop in filters) Vue.filter(`${prop}`, filters[prop]);

  // Add to all instance
  Vue.prototype.$notify = $.notify;
}
