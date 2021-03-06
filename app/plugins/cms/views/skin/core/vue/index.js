import Vue from 'vue';
import App from './App';
import LoginLayout from './components/LoginLayout';
import * as types from './store/types';
import InstallPlugin from "./plugins/plugin";
import CustomPlugin from "./plugins/custom_plugin";
import store from "./store";
import router from "./router";
import { sync } from "vuex-router-sync";

window.CMS_URL = window.settings.services.cmsUrl;
window.WEB_URL = window.settings.services.webUrl;

Vue.use(InstallPlugin);
Vue.use(CustomPlugin);

sync(store, router);

router.beforeEach(async (to, from, next) => {
    store.commit('setLoading', true);
    if (!to.matched.length) {
        next('/404');
        store.commit('setLoading', false);
    } else {
        store.dispatch('isLoggedIn');
        // let authUser = store.getters.authUser;

        if (from.name !== to.name &&
            (from.meta.actions && from.meta.actions.index) !== (to.meta.actions && to.meta.actions.index))
            store.commit(types.RESET_DATA_FILTER, true);
        // let userPermission = authUser ? authUser.scope : [];

        // if (to.meta.permission && to.meta.permission.length) {
        //     let intersecPermission = to.meta.permission.filter(function (n) {
        //         return userPermission.indexOf(n) !== -1;
        //     });
        //     if (intersecPermission && intersecPermission.length) {
        //         next();
        //     }
        //     else {
        //         next('/404');
        //         store.commit('setLoading', false);
        //     }
        // }
        // else {
        //     next();
        // }
        next();
    }
});

router.afterEach((to, from) => {
    setTimeout(() => {
        "use strict";
        store.commit('setLoading', false);
    }, 300);
});

/// Initial application
if (document.getElementById('app_cms')) {
    new Vue({
        el: '#app_cms',
        router,
        store,
        template: '<App/>',
        components: { App }
    });
}

if (document.getElementById('app_login')) {
    new Vue({
        el: '#app_login',
        router,
        store,
        components: { 'loginlayout': LoginLayout }
    });
}
