import * as types from '../store/types';
import router from '../router'
import { ListDataTemplate, QuerySearchDefault } from '@general/constants';
import Service from '../general/services.class';
import Permit from '@Core/permit';

const state = {
  isLoading: true,

  notifyData: [], // Using bootstrap notify

  popupConfirm: {
    show: false,
    title: 'Confirm',
    message: 'Click OK to continue',
    ok: () => { },
    cancel: () => { },
    showCancel: true
  },

  API: null,

  itemSelected: null
};

const mutations = {
  [types.setLoading](state, isLoading) {
    state.isLoading = isLoading;
  },

  [types.GOTO](state, params) {
    router.push(params).catch(err => { });
  },
  [types.GOTO_DETAIL](state, data) {
    router.push(`${data.routeDetail}/${data._id}`).catch(err => { });
  },

  [types.NOTIFY](state, data) {
    state.notifyData.push(data);
  },
  [types.RESET_NOTI](state, data) {
    state.notifyData = [];
  },

  [types.CONFIRM](state, data) {
    data = data ? data : { show: true, title: 'Confirm', message: 'Click OK to continue', ok: () => { }, cancel: () => { } };
    data.title = data.title ? data.title : 'Confirm';
    data.message = data.message ? data.message : 'Click OK to continue';
    data.ok = data.ok ? data.ok : () => { };
    data.cancel = data.cancel ? data.cancel : () => { };
    data.showCancel = typeof data.showCancel != 'undefined' ? data.showCancel : true;

    state.popupConfirm = data;
  },

  [types.INIT_SERVICE](state, apiUrl) {
    if (state.API && state.API instanceof Service) {
      state.API.apiBaseUrl = apiUrl;
    } else {
      state.API = new Service(apiUrl);
    }
  },

  [types.GET_ITEM_SUCCESS](state, dataItem) {
    state.itemSelected = dataItem;
  }
};

const actions = {
  /***** ROUTER ******/
  goto({ commit }, params) {
    commit(types.GOTO, params);
  },
  gotoDetail({ commit }, data) {
    commit(types.GOTO_DETAIL, data);
  },
  /***** END ROUTER ******/


  /***** POPUP CONFIRM ******/
  openConfirm({ commit }, data) {
    data = data ? data : {};
    data.show = true;
    commit(types.CONFIRM, data);
  },
  resetConfirmState({ commit }) {
    commit(types.CONFIRM, {});
  },
  /***** END POPUP CONFIRM ******/

  /***** TOAST NOTIFY ******/
  notify({ commit }, data) {
    commit(types.NOTIFY, data);
  },
  resetNotiList({ commit }) {
    commit(types.RESET_NOTI);
  },
  /***** END TOAST NOTIFY ******/

  /***** FORM & SERVICE ******/
  initService({ commit }, apiUrl) {
    commit(types.INIT_SERVICE, apiUrl);
  },

  getItemById({ commit, state }, { id }) {
    if (invalidApi(commit, state)) return;

    state.API.getItemById(id).then(res => {
      if (res.status === 200 && res.data) {
        commit(types.GET_ITEM_SUCCESS, res.data);
      } else {
        showErrorMessage(commit, res.data.message || 'Can not get item. Please check again url or refresh page', 'warning')
      }
    }).catch(err => {
      showErrorMessage(commit, err.response.data.message || 'Can not get data. Please check your url or refresh page')
    });
  },

  newItem({ commit, state }) {
    if (invalidApi(commit, state)) return;

    state.API.newItem(router.currentRoute.query.originId, router.currentRoute.query.init).then(res => {
      if (res.status === 200 && res.data) {
        commit(types.GET_ITEM_SUCCESS, res.data);
      } else {
        commit(types.NOTIFY, [{
          icon: 'fa fa-warning',
          title: '<strong>Notify</strong>',
          message: res.data.message || 'Can not get item. Please check again url or refresh page',
        }, {
          type: 'warning',
          placement: {
            from: "bottom"
          }
        }]);
        showErrorMessage(commit, res.data.message || 'Can not get item. Please check again url or refresh page', 'warning')
      }
    }).catch(err => {
      showErrorMessage(commit, err.response.data.message || 'Can not get data. Please check your url or refresh page')
    });
  },

  saveItem({ commit, state }, { formData, options }) {
    if (invalidApi(commit, state)) return;

    let id = formData.id || formData._id;
    // update mode
    if (formData && id) {
      state.API.updateItem(id, formData).then(res => {
        if (res.status === 200 && res.data) {
          commit(types.NOTIFY, [{
            icon: 'fa fa-check',
            title: '<strong>Thông báo</strong>',
            message: `Cập nhật thành công!`,
          }, {
            type: 'success',
            placement: {
              from: "bottom"
            }
          }]);
          // if (options.gotoList) {
          //   commit(types.GOTO, { ...options.route });
          // } else {
          //   if (options.routeDetail)
          //     commit(types.GOTO_DETAIL, { ...options.route, _id: res.data.data._id });
          // }
          commit(types.GOTO, { ...options.route });
        } else {
          showErrorMessage(commit, res.data.message || 'Không thể cập nhật. Vui lòng kiểm tra lại!', 'warning')
        }
      }).catch(err => {
        showErrorMessage(commit, err.response && err.response.data && err.response.data.message)
      });
    }
    // create mode
    else {
      state.API.addItem(formData).then(res => {
        if (res.status === 200 && res.data) {
          commit(types.NOTIFY, [{
            icon: 'fa fa-check',
            title: '<strong>Thông báo</strong>',
            message: `Tạo mới thành công!`,
          }, {
            type: 'success',
            placement: {
              from: "bottom"
            }
          }]);

          // if (options.gotoList) {
          //   commit(types.GOTO, { path: options.listRouter });
          // } else {
          //   commit(types.GOTO_DETAIL, { routeDetail: options.routeDetail, _id: res.data.data._id });
          // }
          options.route.params.id = res.data.data && res.data.data._id;
          commit(types.GOTO, { ...options.route });
        } else {
          showErrorMessage(commit, res.data.message || 'Không thể tạo. Vui lòng kiểm tra lại!', 'warning')
        }
      }).catch(err => {
        showErrorMessage(commit, err.response && err.response.data && err.response.data.message ? err.response.data.message : 'Không thể tạo. Vui lòng kiểm tra lại!')
      })
    }
  },

  deleteItem({ commit, state }, { id, options }) {
    if (invalidApi(commit, state)) return;

    state.API.deleteItem(id).then(({ status, data }) => {
      if (status === 200 && data) {
        commit(types.NOTIFY, [{
          icon: 'fa fa-check',
          title: '<strong>Thông báo</strong>',
          message: `Đã xóa thành công!`,
        }, {
          type: 'success',
          placement: {
            from: "bottom"
          }
        }]);
        options && options.route && commit(types.GOTO, { ...options.route });
      } else {
        showErrorMessage(commit, data.message, 'warning')
      }
    }).catch(err => {
      showErrorMessage(commit, err.response && err.response.data && err.response.data.message)
    });
  }
  /***** END  FORM & SERVICE ******/
};

export default {
  state,
  mutations,
  actions
}

function invalidApi(commit, state) {
  if (!state.API || !state.API instanceof Service) {
    commit(types.NOTIFY, [{
      icon: 'fa fa-warning',
      title: '<strong>Error</strong>',
      message: `Please initial service provider to get item!`
    }, {
      type: 'danger',
      placement: {
        from: "bottom"
      }
    }]);

    return true;
  }

  return false;
}

function showErrorMessage(commit, message = '', type = 'danger') {
  commit(types.NOTIFY, [{
    icon: 'fa fa-warning',
    title: '<strong>Thông báo</strong>',
    message,
  }, {
    type,
    placement: {
      from: "bottom"
    }
  }]);
}
