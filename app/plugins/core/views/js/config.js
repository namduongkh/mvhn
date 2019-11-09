import Vue from "vue";
import * as filters from '@/cms/views/skin/core/vue/filters';

for (let prop in filters) Vue.filter(`${prop}`, filters[prop]);

$(function () {
  $('[href^="#"]').each(function () {
    this.pathname = window.location.pathname;
  });
});
