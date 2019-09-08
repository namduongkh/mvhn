const state = {
  selectedMenuItems: []
};

const mutations = {
  selectedMenuItems(state, data) {
    state.selectedMenuItems.push(data);
  },
  clearedMenuItems(state) {
    state.selectedMenuItems = [];
  }
};

const actions = {
  selectMenuItems({ commit }, data) {
    commit('selectedMenuItems', data);
  },
  clearMenuItems({ commit }) {
    commit('clearedMenuItems');
  }
};

export default {
  state,
  mutations,
  actions
}