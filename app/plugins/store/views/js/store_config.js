const state = {
  selectedMenuItems: [],
  numberOfCartItems: 0,
  shouldLoadMyOrder: false,
  shouldRefreshOrder: false,
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
  shouldRefreshOrder(state, status) {
    state.shouldRefreshOrder = status;
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
  refreshOrder({ commit }, status) {
    commit('shouldRefreshOrder', status);
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
