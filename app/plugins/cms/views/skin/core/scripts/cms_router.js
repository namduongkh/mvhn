import Permit from "./permit";

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
      meta: this.meta(title || `List ${this.name}`)
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
      meta: this.meta(title || `New ${singularize(this.name)}`)
    });

    return this;
  }

  show(component, title = null) {
    if (!component) throw new Error("Provide component for `show`");
    if (!this.permit('show')) return this;

    this.config.childrens.push({
      name: `Show${singularize(this.name)}`,
      path: `/${this.path}/:id`,
      hidden: true,
      component: component,
      meta: this.meta(title || `Show ${singularize(this.name)}`)
    });

    return this;
  }

  customRoute(actionName, config, permitActionName = '') {
    if (!this.permit(permitActionName || actionName)) return this;

    config.meta = this.meta(config.name);
    this.config.childrens.push(config);
    return this;
  }

  default(components = {}) {
    let { List, Detail } = components;
    if (!List || !Detail) throw new Error("Provide component for `index` and `detail`");

    return this.index(List).new(Detail).show(Detail);
  }

  toObject() {
    if (this.config.childrens.length) return this.config;
    return;
  }

  permit(action) {
    return Permit.getInstance().isPermitted(this.path, action);
  }

  meta(title) {
    return {
      title,
      controller: this.path
    }
  }
}

function singularize(string) {
  return string.replace(/ies$/, 'ys').replace(/s$/, '');
}