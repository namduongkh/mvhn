const state = {
  navigatorItems: [],
  navigatorItemIndex: {}
};

const mutations = {
  addNavigatorItem(state, data) {
    state.navigatorItems.push(data);
    reindex();
  },
  setNotifyNumber(state, data) {
    let { id, number } = data;
    if (!id) return;

    state.navigatorItems[state.navigatorItemIndex[id]].notifyNumber = number
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
  setNotifyNumber({ commit }, data) {
    commit('setNotifyNumber', data);
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
