import Vue from 'vue';
import Vuex from 'vuex';
import AuthService from "@/user/views/js/auth_service";

Vue.use(Vuex);

const state = {
  user: null,
  selectedMenuItems: []
}

const mutations = {
  selectedMenuItems(state, data) {
    state.selectedMenuItems.push(data);
  },
  clearedMenuItems(state) {
    state.selectedMenuItems = [];
  },
  fetchedUser(state, data) {
    state.user = data;
  }
}

const actions = {
  selectMenuItems({ commit }, data) {
    commit('selectedMenuItems', data);
  },
  clearMenuItems({ commit }) {
    commit('clearedMenuItems');
  },
  fetchUser({ commit }) {
    new AuthService().account().then(({ data }) => {
      commit('fetchedUser', data);
    });
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
