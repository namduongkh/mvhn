'use strict';
import Vue from "vue";
import StoreCart from "./StoreCart";

if ($('#store') && $('#store').length) {

  new Vue({
    el: '#store',
    components: {
      StoreCart
    }
  });
}