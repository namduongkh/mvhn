'use strict';
import Vue from "vue";
import VueRouter from "vue-router";
import Vuex from "vuex";
import StoreCart from "./StoreCart";
import StorePanel from "./StorePanel";
import store from "./store";

if ($('#store') && $('#store').length) {
  Vue.use(VueRouter);
  Vue.use(Vuex);

  new Vue({
    el: '#store',
    store,
    components: {
      StoreCart,
      StorePanel
    },
    created() {
      this.$store.dispatch('fetchUser');
    }
  });
}