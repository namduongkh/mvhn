import * as types from '../../store/types'
import dashboard from './dashboard'
import auth from './auth';
import form from './form';

import modulesRouting from '../../../../routers';

let routes = [auth, dashboard, form];
window.enabledPlugins.forEach((pluginName) => {
    if (modulesRouting[pluginName]) {
        routes.push(modulesRouting[pluginName]);
    }
})

const state = {
    menu_active: '',
    items: routes
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
}