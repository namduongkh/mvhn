import Vue from "vue";
import Deals from "./components/Deals";
import DealDetail from "./components/DealDetail";
import VuexConfig from "@/core/views/vuex/vuex_config";

if ($('.deals') && $('.deals').length) {
  new Vue({
    el: '.deals',
    components: {
      Deals
    },
    store: new VuexConfig(['user']).toVuexStore(),
    template: "<Deals />",
    created() { }
  });
}

if ($('.deal-detail') && $('.deal-detail').length) {
  new Vue({
    el: '.deal-detail',
    components: {
      DealDetail
    },
    store: new VuexConfig(['user']).toVuexStore(),
    template: "<DealDetail dealId='" + $('.deal-detail').data('id') + "'/>",
  });
}
