'use strict';
import Vue from "vue";
import TableOfContent from "./TableOfContent";
import VuexConfig from "@/core/views/vuex/vuex_config";

if ($('.table-of-content') && $('.table-of-content').length) {
  new Vue({
    el: '.table-of-content',
    store: new VuexConfig().toVuexStore(),
    template: `
      <TableOfContent selector="${$('.table-of-content').data('selector')}"></TableOfContent>
    `,
    components: {
      TableOfContent
    }
  });
}
