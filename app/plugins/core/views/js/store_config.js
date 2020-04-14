const state = {
  navigatorItems: [],
  navigatorItemIndex: {}
};

const mutations = {
  addNavigatorItem(state, data) {
    let items = state.navigatorItems.concat([data]);
    state.navigatorItems = items.sort((a, b) => {
      return (a.order < b.order) || b.order ? 1 : -1;
    });
    reindex();
  },
  updateNavigatorItem(state, data) {
    let { id } = data;
    if (!id) return;

    state.navigatorItems[state.navigatorItemIndex[id]] = Object.assign(state.navigatorItems[state.navigatorItemIndex[id]], data);
  }
};

const actions = {
  addNavigatorItem({ commit }, data) {
    data.htmlOptions = data.htmlOptions || '';

    if (data.htmlOptions && typeof data.htmlOptions == 'object') {
      let htmlOptions = [];
      for (let i in data.htmlOptions) {
        htmlOptions.push(`${i}="${data.htmlOptions[i]}"`)
      }

      data.htmlOptions = htmlOptions.join(" ");
    }

    commit('addNavigatorItem', data);
  },
  updateNavigatorItem({ commit }, data) {
    commit('updateNavigatorItem', data);
  }
};

const getters = {
  navigatorItems: state => state.navigatorItems
}

export default {
  state,
  mutations,
  actions,
  getters
}

function reindex() {
  state.navigatorItems.forEach((item, index) => {
    if (!item.id) return;

    state.navigatorItemIndex[item.id] = index;
  });
}
