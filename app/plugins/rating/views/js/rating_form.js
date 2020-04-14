'use strict';
import Axios from "axios";
import Vue from "vue";
import vi from 'vee-validate/dist/locale/vi';
import VeeValidate, { Validator } from "vee-validate";
import VuexConfig from "@/core/views/vuex/vuex_config";
import { mapGetters } from "vuex";

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
    store: new VuexConfig().toVuexStore(),
    computed: {
      ...mapGetters("user", ["user"])
    },
    data() {
      return {
        rating: {
          object: $('#rating-object').val()
        },
        ratings: [],
        requireLogin: $('#rating-form').data('require-login') + '' == 'true',
        defaultAvatar: '/cms/assets/images/avatar-sign.png'
      };
    },
    created() {
      this.index();
      this.$store.dispatch('user/fetchUser');
      this.$store.watch(state => state.user.user,
        user => {
          this.rating.guest = this.user.name;
          this.rating.user = this.user._id;
          this.rating.avatar = this.user.avatar || this.defaultAvatar;
        });
    },
    methods: {
      submit() {
        if (this.requireLogin && !this.user) {
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
