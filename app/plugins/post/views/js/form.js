'use strict';
import Vue from "vue";
import TableOfContent from "./TableOfContent";
import VuexConfig from "@/core/views/vuex/vuex_config";

if ($('#post-content') && $('#post-content').length) {
  new Vue({
    el: '#post-content',
    store: new VuexConfig().toVuexStore(),
    components: {
      TableOfContent
    }
  });
}
