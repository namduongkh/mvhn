'use strict';
import Vue from "vue";
// import VueRouter from "vue-router";
import Vuex from "vuex";
import StoreCart from "./StoreCart";
import StorePanel from "./StorePanel";
import MultipleOrder from "./MultipleOrder";
import VuexConfig from "@/core/views/vuex/vuex_config"

if ($('#store') && $('#store').length) {
  // Vue.use(VueRouter);
  Vue.use(Vuex);

  new Vue({
    el: '#store',
    store: new VuexConfig(['store']).toVuexStore(),
    components: {
      StoreCart,
      StorePanel,
      MultipleOrder
    },
    created() {
      this.$store.dispatch('user/fetchUser')
    }
  });
}
