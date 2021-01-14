'use strict';
import Vue from "vue";
import StoreProduct from "@Plugin/store/views/js/StoreProduct.vue";

$(function () {
  $('.product-content__expander').on('click', function () {
    if ($('.product-content').hasClass('closed')) {
      $('.product-content').addClass('opened').removeClass('closed');
    } else if ($('.product-content').hasClass('opened')) {
      $('.product-content').addClass('closed').removeClass('opened');
    }
  });

  if ($('.product-content').height() <= 200) {
    $('.product-content').addClass('opened').removeClass('closed');
  }
});

if ($('.list-product') && $('.list-product').length) {
  new Vue({
    el: '.list-product',
    components: {
      StoreProduct
    }
  });
}
