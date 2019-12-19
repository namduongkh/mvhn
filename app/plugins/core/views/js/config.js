import Vue from "vue";
import Helpers from "@Utils/application_helper";

for (let prop in Helpers) Vue.filter(`${prop}`, Helpers[prop]);

$(function () {
  $('[href^="#"]').each(function () {
    this.pathname = window.location.pathname;
  });
});
