'use strict';
import Vue from "vue";
import StoreMenu from "./StoreMenu";

if ($('#store') && $('#store').length) {

  new Vue({
    el: '#store',
    components: {
      StoreMenu
    }
  });
}