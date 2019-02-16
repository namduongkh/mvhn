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
        blog: window.blog || {
          type: 'post'
        }
      };
    },
    methods: {
      generateSlug() {
        let that = this;
        if (this.blog.title && !this.blog.slug) {
          Axios.post(`${window.settings.services.apiUrl}/api/blogs/generate-slug`, {
            title: this.blog.title
          }).then(function (resp) {
            that.blog.slug = resp.data;
            that.$forceUpdate();
          });
        }
      },
      submit() {
        this.$validator.validateAll().then((result) => {
          if (result) {
            Common.showLoader();
            let promise;
            if (this.blog._id) {
              promise = Axios.put(`${window.settings.services.webUrl}/api/blogs/update/${this.blog._id}`, {
                blog: this.blog
              });
            } else {
              promise = Axios.post(`${window.settings.services.webUrl}/api/blogs/create`, {
                blog: this.blog
              });
            }
            promise
              .then((resp) => {
                window.location.href = `${window.settings.services.webUrl}/blogs/${resp.data.slug}?allowAdmin=1`;
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
