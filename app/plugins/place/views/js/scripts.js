import Vue from "vue";

if ($('#place') && $('#place').length) {
  Vue.use(Vuex);

  new Vue({
    el: '#place'
  });
}
