import Vue from 'vue';
import Vuex from 'vuex';
import _ from 'lodash';

import StoreConfig from './store_config';

Vue.use(Vuex);

export default class VuexConfig {
  constructor(plugins = []) {
    if (!Array.isArray(plugins)) {
      return console.error('VuexConfig need a plugins folder array');
    }

    let defaultStore = ['core', 'user'];
    defaultStore.forEach(function (storeName) {
      if (!plugins.includes(storeName)) {
        plugins.push(storeName);
      }
    });

    this.modules = {};

    for (let i in plugins) {
      let plugin = plugins[i];
      if (StoreConfig[plugin]) {
        StoreConfig[plugin].namespaced = true;
        this.modules[plugin] = StoreConfig[plugin];
      }
    }
  }

  toVuexStore() {
    return new Vuex.Store({
      modules: this.modules
    });
  }
}
