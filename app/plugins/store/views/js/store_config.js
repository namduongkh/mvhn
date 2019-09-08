const state = {
  selectedMenuItems: [],
  numberOfCartItems: 0,
  shouldLoadMyOrder: false
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
  shouldLoadMyOrder({ commit }, status) {
    commit('shouldLoadMyOrder', status);
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