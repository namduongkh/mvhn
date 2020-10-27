import Vue from "vue";
import Deals from "./components/Deals";
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
