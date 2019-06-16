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

  list(component, title = null) {
    if (!component) throw new Error("Provide component for `list`");

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

    this.config.childrens.push({
      name: `New${singularize(this.name)}`,
      path: `/${singularize(this.path)}/new`,
      component: component,
      meta: {
        title: title || `New ${singularize(this.name)}`
      }
    });
    return this;
  }

  edit(component, title = null) {
    if (!component) throw new Error("Provide component for `edit`");

    this.config.childrens.push({
      name: `Edit${singularize(this.name)}`,
      path: `/${singularize(this.path)}/:id`,
      hidden: true,
      component: component,
      meta: {
        title: title || `Edit ${singularize(this.name)}`
      }
    });
    return this;
  }

  children(config) {
    this.config.childrens.push(config);
    return this;
  }

  default(components = {}) {
    let { List, Detail } = components;
    if (!List || !Detail) throw new Error("Provide component for `list` and `detail`");

    return this.list(List).new(Detail).edit(Detail);
  }

  toObject() {
    if (accessibles.includes(`/cms/${this.path}`)) return this.config;
    return;
  }
}

function singularize(string) {
  return string.replace(/ies$/, 'ys').replace(/s$/, '');
}