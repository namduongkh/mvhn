'use strict';
import Axios from "axios";
import Vue from "vue";
import { VueEditor } from 'vue2-editor';
import ImageUploader from "../../../upload/views/js/image-uploader";
import vi from 'vee-validate/dist/locale/vi';
import VeeValidate, { Validator } from "vee-validate";
import AuthService from "@/user/views/js/auth_service";

if ($('#rating-form') && $('#rating-form').length) {

  Vue.component('rating-result', {
    props: {
      star: {
        type: Number,
        default: 0
      }
    },
    data: function () {
      return {}
    },
    template: `
      <div class="rating rating-result">
        <input type="radio" :checked="star == 5">
        <label></label>
        <input type="radio" :checked="star == 4">
        <label></label>
        <input type="radio" :checked="star == 3">
        <label></label>
        <input type="radio" :checked="star == 2">
        <label></label>
        <input type="radio" :checked="star == 1">
        <label></label>
      </div>
    `
  })

  Validator.localize('vi', vi);
  Vue.use(VeeValidate, {
    locale: 'vi'
  });

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
        ratings: [],
        user: null,
        authService: new AuthService()
      };
    },
    created() {
      this.index();
      this.authService.account().then(({ data }) => {
        if (!data._id) return;
        this.user = data;
        this.rating.guest = this.user.name;
        this.rating.user = this.user._id;
      });
    },
    methods: {
      submit() {
        if (!this.user) {
          alert("Vui lòng đăng nhập để đánh giá.");
          $('.auth-panel__opener').trigger('click');
          return;
        }

        this.$validator.validateAll().then((result) => {
          if (result) {
            Axios.post(`${window.settings.services.webUrl}/ratings`, this.rating).then(({ data }) => {
              toastr.success("Cảm ơn bạn đã đánh giá!");
              this.rating.star = null;
              this.rating.comment = '';
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
