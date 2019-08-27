'use strict';
import Axios from "axios";
import Vue from "vue";
import { VueEditor } from 'vue2-editor';
import VeeValidate from 'vee-validate'
import ImageUploader from "../../../upload/views/js/image-uploader";

if ($('#rating-form') && $('#rating-form').length) {

  Vue.use(VeeValidate);
  new Vue({
    el: '#rating-form',
    // components: {
    //   VueEditor,
    //   ImageUploader
    // },
    data() {
      return {
        rating: {
          object: $('#rating-object').val()
        },
        ratings: []
      };
    },
    created() {
      this.index();
    },
    methods: {
      submit() {
        this.$validator.validateAll().then((result) => {
          if (result) {
            Axios.post(`${window.settings.services.webUrl}/ratings`, this.rating).then(({ data }) => {
              alert('Cảm ơn bạn đã đánh giá!');
              this.rating = {
                object: $('#rating-object').val()
              };
              this.index();
            });
          }
        });
      },
      index() {
        Axios.get(`${window.settings.services.webUrl}/ratings`, {
          params: {
            object: $('#rating-object').val(),
            sort: "createdAt|desc",
            notPaginate: true
          }
        }).then(({ data }) => {
          this.ratings = data.data;
        });
      }
    }
  });
}
