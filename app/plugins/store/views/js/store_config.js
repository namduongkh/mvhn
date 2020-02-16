const state = {
  selectedMenuItems: [],
  numberOfCartItems: 0,
  shouldLoadMyOrder: false,
  shouldRefreshOrder: 0,
};

const mutations = {
  selectedMenuItems(state, data) {
    state.selectedMenuItems.push(data);
  },
  clearedMenuItems(state) {
    state.selectedMenuItems = [];
  },
  numberOfCartItems(state, number) {
    state.numberOfCartItems = number;
  },
  shouldLoadMyOrder(state, status) {
    state.shouldLoadMyOrder = status;
  },
  shouldRefreshOrder(state) {
    state.shouldRefreshOrder += 1;
  }
};

const actions = {
  selectMenuItems({ commit }, data) {
    commit('selectedMenuItems', data);
  },
  clearMenuItems({ commit }) {
    commit('clearedMenuItems');
  },
  numberOfCartItems({ commit }, number) {
    commit('numberOfCartItems', number);
  },
  loadMyOrder({ commit }, status) {
    commit('shouldLoadMyOrder', status);
  },
  refreshOrder({ commit }) {
    commit('shouldRefreshOrder');
  }
};

const getters = {
  numberOfCartItems: state => state.numberOfCartItems
}

export default {
  state,
  mutations,
  actions,
  getters
}
