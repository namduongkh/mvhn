import * as types from '../store/types';
import Auth from '../services/auth';
import Vue from 'vue';

export default {
    state: {
        authUser: window.user || null,
        authResult: null
    },
    mutations: {
        [types.UPDATE_AUTH](state, authInfo) {
            state.authUser = authInfo;
        },
        [types.USER_LOGIN](state, result) {
            state.authResult = result;
        }
    },
    actions: {
        login({ commit }, data) {
            Auth
                .login(data)
                .then(resp => {
                    // FIXME: when have a VPS
                    if (settings.services.webUrl.includes('mucngay.info')) {
                        Vue.cookie.set(window.cookieKey, resp.data.token, { expires: 7 });
                    }
                    commit(types.USER_LOGIN, {
                        [window.cookieKey]: resp.data.token,
                        message: 'Login successfully',
                        success: true
                    });
                })
                .catch(err => {
                    commit(types.USER_LOGIN, {
                        message: err.response.data.message,
                        success: false
                    });
                })
        },
        logout({ commit }) {
            Auth
                .logout()
                .then(resp => {
                    commit(types.UPDATE_AUTH, null);
                })
                .catch(err => {
                    console.log('err', err);
                })
        },
        isLoggedIn({ commit }) {
            Auth
                .isLoggedIn()
                .then(resp => {
                    if (resp && resp.data) {
                        commit(types.UPDATE_AUTH, resp.data);
                    } else {
                        commit(types.UPDATE_AUTH, false);
                    }
                })
                .catch(err => {
                    commit(types.UPDATE_AUTH, false);
                })
        }
    },
}