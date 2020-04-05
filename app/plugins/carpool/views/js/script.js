import Vue from "vue";
import CarpoolPanel from "./CarpoolPanel";

if ($('#carpool') && $('#carpool').length) {
  new Vue({
    el: '#carpool',
    components: {
      CarpoolPanel
    },
    created() {
    }
  });
}
