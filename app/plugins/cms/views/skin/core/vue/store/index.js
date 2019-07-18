import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import * as getters from './getters';
import menu from '../modules/menu';
import app from '..//modules/app';
import auth from '../modules/auth';
import listing from '../modules/listing';

const store = new Vuex.Store({
    strict: true,
    getters,
    modules: {
        auth,
        menu,
        app,
        listing
    },
    state: {},
    mutations: {}
});

export default store
