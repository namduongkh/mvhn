import { intersection } from "lodash";

export default class CmsRouter {
  constructor(name, path, options = {}) {
    if (!name || !path) throw new Error("Provide router `name` and `path`");
    let _options = {
      iconClass: 'fa fa-dot-circle-o',
      color: 'blue-dirty',
      ...options
    }

    this.name = name;
    this.path = path;
    this.config = {
      name,
      path: `/${this.path}_management`,
      meta: {
        title: this.name,
        ..._options
      },
      childrens: []
    }
  }

  index(component, title = null) {
    if (!component) throw new Error("Provide component for `index`");
    if (!this.permit('index')) return this;

    this.config.childrens.push({
      name: `List${this.name}`,
      path: `/${this.path}`,
      hidden: false,
      component: component,
      meta: {
        title: title || `List ${this.name}`
      }
    });

    return this;
  }

  new(component, title = null) {
    if (!component) throw new Error("Provide component for `new`");
    if (!this.permit('new')) return this;

    this.config.childrens.push({
      name: `New${singularize(this.name)}`,
      path: `/${this.path}/new`,
      component: component,
      meta: {
        title: title || `New ${singularize(this.name)}`
      }
    });

    return this;
  }

  edit(component, title = null) {
    if (!component) throw new Error("Provide component for `edit`");
    if (!this.permit('edit')) return this;

    this.config.childrens.push({
      name: `Edit${singularize(this.name)}`,
      path: `/${this.path}/:id`,
      hidden: true,
      component: component,
      meta: {
        title: title || `Edit ${singularize(this.name)}`
      }
    });

    return this;
  }

  customRoute(actionName, config) {
    if (!this.permit(actionName)) return this;

    this.config.childrens.push(config);
    return this;
  }

  default(components = {}) {
    let { List, Detail } = components;
    if (!List || !Detail) throw new Error("Provide component for `index` and `detail`");

    return this.index(List).new(Detail).edit(Detail);
  }

  toObject() {
    if (this.config.childrens.length) return this.config;
    return;
  }

  permit(action) {
    let fullPath = `${this.path}/${action}`;
    for (let i in accessibles) {
      let right = accessibles[i];
      let matched = fullPath.match(new RegExp(right));
      if (matched && matched[0] == fullPath) return true;
    }
    return false;
  }
}

function singularize(string) {
  return string.replace(/ies$/, 'ys').replace(/s$/, '');
}