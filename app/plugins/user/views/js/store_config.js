import AuthService from "@/user/views/js/auth_service";

const state = {
  user: null,
  accountPromise: null
}

const mutations = {
  fetchedUser(state, data) {
    if (!data._id) return;
    state.user = data;
    window.user = data;
  }
}

const actions = {
  fetchUser({ commit, state }, data) {
    let { force } = data || {};
    if (!state.accountPromise || force) {
      state.accountPromise = new AuthService().account();
    }
    state.accountPromise.then(({ data }) => {
      if (state.user && !force) return state.accountPromise = null;
      commit('fetchedUser', data);
    });
  },
  updateInfo({ commit }, data) {
    commit('fetchedUser', data);
  }
}

const getters = {
  user: state => state.user
}

export default {
  state,
  mutations,
  actions,
  getters
}
