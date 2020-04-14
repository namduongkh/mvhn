import Vue from "vue";
import CarpoolPanel from "./CarpoolPanel";
import VuexConfig from "@/core/views/vuex/vuex_config"

if ($('#carpool') && $('#carpool').length) {
  new Vue({
    el: '#carpool',
    store: new VuexConfig().toVuexStore(),
    components: {
      CarpoolPanel
    },
    created() {
      this.$store.dispatch('user/fetchUser')
    }
  });
}
