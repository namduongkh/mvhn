import Axios from "axios";

export default class StoreMenuLoader {
  static perform(store) {
    if (!this.loaded) this.loaded = {};
    if (this.loaded[store]) return this.loaded[store];

    this.loaded[store] = Axios.get(window.settings.services.cmsUrl + "/store_menus", {
      withCredentials: true,
      params: {
        notPaginate: true,
        store: store,
        select: "name image price"
      }
    });

    return this.loaded[store];
  }
}
