import * as types from '../store/types';
import { SearchParamsDefault } from '@general/constants';

const state = {
    filterData: {
        default: defaultFilterData()
    },
    isReloadTable: false,
    isResetFormFilter: false,
    isResetParams: false,
    filterName: 'default'
};

const mutations = {
    [types.SET_PARAMS](state, data) {
        for (let prop in data) state.filterData[state.filterName][prop] = data[prop];
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
        if (state.isResetFormFilter) {
            resetFilterData(state);
        }
    },
    [types.SET_FILTER_NAME](state, value) {
        state.filterName = value;
        if (!state.filterData[value]) {
            resetFilterData(state);
        }
    },
};

const actions = {
    setParams({ commit }, data) {
        data = data ? data : {};
        commit(types.SET_PARAMS, data);
    },
    resetParams({ commit }) {
        commit(types.RESET_PARAMS);
    },
    reloadTable({ commit }, value = true) {
        commit(types.SET_RELOAD_TABLE, value);
    },
    resetFormFilter({ commit }, value = false) {
        commit(types.RESET_DATA_FILTER, value);
    },
    setFilterName({ commit }, value = 'default') {
        commit(types.SET_FILTER_NAME, value);
    }
};

function defaultFilterData() {
    return JSON.parse(JSON.stringify(SearchParamsDefault));
}

function resetFilterData(state) {
    state.filterData[state.filterName] = defaultFilterData();
}

export default {
    state,
    mutations,
    actions
}
