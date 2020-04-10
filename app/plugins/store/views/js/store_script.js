'use strict';
import Vue from "vue";
import Vuex from "vuex";
import StoreCart from "./StoreCart";
import StorePanel from "./StorePanel";
import StoreTables from "./StoreTables";
import StoreTableOrder from "./StoreTableOrder";
import MultipleOrder from "./MultipleOrder";
import StoreProducts from "./StoreProducts";
import VuexConfig from "@/core/views/vuex/vuex_config"

if ($('#store') && $('#store').length) {
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

if ($('#store-table') && $('#store-table').length) {
  new Vue({
    el: '#store-table',
    store: new VuexConfig(['store']).toVuexStore(),
    components: {
      StoreTables,
      StoreTableOrder
    },
    created() {
      this.$store.dispatch('user/fetchUser')
    }
  });
}

if ($('#store-product') && $('#store-product').length) {
  new Vue({
    el: '#store-product',
    store: new VuexConfig(['store']).toVuexStore(),
    components: {
      StoreProducts
    },
    created() {
      this.$store.dispatch('user/fetchUser')
    }
  });
}
