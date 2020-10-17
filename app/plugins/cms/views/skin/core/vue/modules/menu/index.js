import * as types from '../../store/types'
import dashboard from './dashboard'
import auth from './auth';
import form from './form';
import _ from "lodash";

import routers from '../../../../routers';

let routes = [auth, dashboard, form];

window.enabledPlugins.forEach((pluginName) => {
  if (routers[pluginName]) {
    if (Array.isArray(routers[pluginName])) {
      routes = routes.concat(_.compact(routers[pluginName]));
    } else {
      routes.push(routers[pluginName]);
    }
  }
});

const state = {
  menu_active: '',
  items: routes,
  routes: routes.filter(r => !r.redirect)
};

const mutations = {
  [types.SET_ACTIVE_MENU](state, data) {
    state.menu_active = data;
  }
};

const actions = {
  [types.SET_ACTIVE_MENU]({ commit }, payload) {
    commit(types.SET_ACTIVE_MENU, payload);
  }
};

export default {
  state,
  mutations,
  actions
};
