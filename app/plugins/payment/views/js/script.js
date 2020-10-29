import Vue from "vue";
import Payments from "./components/Payments";
import VuexConfig from "@/core/views/vuex/vuex_config";

if ($('.payments') && $('.payments').length) {
  new Vue({
    el: '.payments',
    components: {
      Payments
    },
    store: new VuexConfig(['user']).toVuexStore(),
    template: "<Payments />",
    created() { }
  });
}
