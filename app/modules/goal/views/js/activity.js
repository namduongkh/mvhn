'use strict';
import Vue from "vue";
import Axios from "axios";
import UtilsHelper from "../../../../utils/helpers";
import VeeValidate from 'vee-validate'
import { VueEditor } from 'vue2-editor';

if ($('#mod-form-activity') && $('#mod-form-activity').length) {
  let webUrl = window.settings.services.webUrl + '/api/activities';
  Vue.use(VeeValidate);
  new Vue({
    el: '#mod-form-activity',
    data() {
      return {
        activity: {}
      }
    },
    components: {
      VueEditor
    },
    filters: {
      formatDate: UtilsHelper.formatDate
    },
    methods: {
      show(id) {
        let that = this;
        Axios.get(`${webUrl}/${id}`).then((resp) => {
          that.activity = resp.data;
        });
      },
      update() {
        this.$validator.validateAll().then((result) => {
          if (!result) return;
          let that = this;
          Axios.put(`${webUrl}/${that.activity._id}`, {
            activity: that.activity
          }).then((resp) => {
            // that.activity = resp.data;
            // alert('Updated!');
            if (resp.data) {
              window.location.reload();
            }
          });
        });
      }
    }
  })
}