import * as types from '../store/types';
import { SearchParamsDefault } from '@general/constants';
import Auth from "../services/auth";
import router from "../router";

const state = {
    filterData: JSON.parse(JSON.stringify(SearchParamsDefault)),
    isReloadTable: false,
    isResetFormFilter: false,
    isResetParams: false
};

const mutations = {
    [types.SET_PARAMS](state, data) {
        for (let prop in data) state.filterData[prop] = data[prop];
        state.isResetParams = false;
    },
    [types.RESET_PARAMS](state) {
        state.isResetParams = true;
    },
    [types.SET_RELOAD_TABLE](state, value) {
        state.isReloadTable = value;
    },
    [types.RESET_DATA_FILTER](state, value) {
        state.isResetFormFilter = value;
        if(state.isResetFormFilter){
            state.filterData = JSON.parse(JSON.stringify(SearchParamsDefault));
        }
    },
};

const actions = {
    setParams({commit}, data) {
        data = data ? data : {};
        commit(types.SET_PARAMS, data);
    },
    resetParams({commit}) {
        commit(types.RESET_PARAMS);
    },
    reloadTable({commit}, value = true) {
        commit(types.SET_RELOAD_TABLE, value);
    },
    resetFormFilter({commit}, value = false){
        commit(types.RESET_DATA_FILTER, value);
    }
};


export default {
    state,
    mutations,
    actions
}