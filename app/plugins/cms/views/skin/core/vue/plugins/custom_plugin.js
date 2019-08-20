import Vue from "vue";

import StorePanel from "@Plugin/store/views/cms/components/StorePanel";

export default {
    install
}

function install() {
    Vue.component("StorePanel", StorePanel);
}
