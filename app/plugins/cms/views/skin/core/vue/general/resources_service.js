import Service from "./services.class";
import Axios from "axios";

export default class ResourcesService extends Service {
  index(params) {
    return this.getItems(params);
  }

  new() {
    return this.newItem();
  }

  edit(id) {
    return Axios
      .get(`${this.apiBaseUrl}/${id}/edit`, {
        withCredentials: true
      })
  }

  show(id) {
    return this.getItemById(id);
  }

  create(data) {
    return this.addItem(data);
  }

  update(id, data) {
    return this.updateItem(id, data);
  }

  delete(id) {
    return this.deleteItem(id);
  };

  member(path, method = 'GET', data = {}, config = {}) {
    return Axios.request({
      url: `${this.apiBaseUrl}/${path}`,
      method,
      data,
      withCredentials: true,
      ...config
    });
  }
}
