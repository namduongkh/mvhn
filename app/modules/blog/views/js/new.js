'use strict';
import Axios from "axios";
import Vue from "vue";
import { VueEditor } from 'vue2-editor';
import VeeValidate from 'vee-validate'
import ImageUploader from "../../../upload/views/js/image-uploader";

if ($('#mod-blog-new') && $('#mod-blog-new').length) {

  Vue.use(VeeValidate);
  new Vue({
    el: '#mod-blog-new',
    components: {
      VueEditor,
      ImageUploader
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
                window.location.href = `${window.settings.services.webUrl}/blogs/${resp.data.slug}`;
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
