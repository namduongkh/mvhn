import Vue from "vue";
import Helpers from "@Utils/application_helper";
import { Datetime } from 'vue-datetime';
import { Settings } from 'luxon'

for (let prop in Helpers) Vue.filter(`${prop}`, Helpers[prop]);

$(function () {
  $('[href^="#"]').each(function () {
    this.pathname = window.location.pathname;
  });
});

Vue.component('datetime', Datetime);
Settings.defaultLocale = 'vi';
