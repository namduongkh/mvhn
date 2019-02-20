'use strict';
import Axios from "axios";
import Vue from "vue";
import { VueEditor } from 'vue2-editor';
import VeeValidate from 'vee-validate'
import Datepicker from 'vuejs-datepicker';
import ImageUploader from "../../../upload/views/js/image-uploader";

if ($('#mod-goal-new') && $('#mod-goal-new').length) {
  Vue.use(VeeValidate);
  new Vue({
    el: '#mod-goal-new',
    components: {
      VueEditor,
      ImageUploader,
      Datepicker
    },
    data() {
      return {
        goal: window.goal || {
          status: 1,
          day_of_weeks: [0, 1, 2, 3, 4, 5, 6]
        }
      };
    },
    methods: {
      submit() {
        this.$validator.validateAll().then((result) => {
          if (result) {
            Common.showLoader();
            let promise;
            if (this.goal._id) {
              promise = Axios.put(`${window.settings.services.webUrl}/api/goals/update/${this.goal._id}`, {
                goal: this.goal
              });
            } else {
              promise = Axios.post(`${window.settings.services.webUrl}/api/goals/create`, {
                goal: this.goal
              });
            }
            promise
              .then((resp) => {
                window.location.href = `${window.settings.services.webUrl}/goals/${resp.data._id}?allowAdmin=1`;
              })
              .finally(() => {
                Common.hideLoader(200);
              });
          } else {
            Common.scrollTo($('[aria-invalid="true"]'));
          }
        });
      }
    }
  });
}
