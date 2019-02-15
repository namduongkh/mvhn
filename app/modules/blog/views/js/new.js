'use strict';

import Axios from "axios";
import Vue from "vue";
import { VueEditor } from 'vue2-editor';
import VeeValidate from 'vee-validate';

Vue.use(VeeValidate);

if ($('#mod-blog-new') && $('#mod-blog-new').length) {
  new Vue({
    el: '#mod-blog-new',
    components: {
      VueEditor
    },
    data() {
      return {
        blog: {
          type: 'post'
        }
      };
    },
    methods: {
      create() {
        this.$validator.validateAll().then((result) => {
          if (result) {
            Common.showLoader();
            Axios.post(`${window.settings.services.webUrl}/api/blogs/create`, {
              blog: this.blog
            })
              .then((resp) => {
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
