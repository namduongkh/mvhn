import * as types from '../../store/types'
import dashboard from './dashboard'
import auth from './auth';
import form from './form';

import modulesRouting from '../../../../routers';

const state = {
    menu_active: '',
    items: [
        auth,
        dashboard,
        form,
    ].concat(modulesRouting)
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