import Service from "./services.class";

export default class ResourcesService extends Service {
  index(params) {
    return this.getItems(params);
  }

  new() {
    return this.newItem();
  }

  edit(id) {
    return this.getItemById(id);
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
}
