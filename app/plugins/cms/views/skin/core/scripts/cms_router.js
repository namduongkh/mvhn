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
    this.actions = {};
  }

  index(component, title = null, config = {}) {
    if (!component) throw new Error("Provide component for `index`");
    if (!this.permit('index')) return this;

    if (config.hidden) {
      this.config.hidden = true;
    }

    this.config.childrens.push({
      name: this.routeName().index,
      path: `/${this.path}`,
      hidden: config.hidden,
      component: component,
      meta: this.meta(title || this.title().index)
    });
    this.addAction('index', this.routeName().index);

    return this;
  }

  new(component, title = null, config = {}) {
    if (!component) throw new Error("Provide component for `new`");
    if (!this.permit('new')) return this;

    this.config.childrens.push({
      name: this.routeName().new,
      path: `/${this.path}/new`,
      component: component,
      hidden: config.hidden,
      meta: this.meta(title || this.title().new)
    });
    this.addAction('new', this.routeName().new);

    return this;
  }

  edit(component, title = null, config = {}) {
    if (!component) throw new Error("Provide component for `edit`");
    if (!this.permit('edit')) return this;

    this.config.childrens.push({
      name: this.routeName().edit,
      path: `/${this.path}/:id`,
      hidden: config.hidden || true,
      component: component,
      meta: this.meta(title || this.title().edit)
    });
    this.addAction('edit', this.routeName().edit);

    return this;
  }

  customRoute(actionName, config, permitActionName = '') {
    if (!this.permit(permitActionName || actionName)) return this;

    config.meta = this.meta(config.title || config.name);
    this.config.childrens.push(config);
    this.addAction(actionName, config.name);
    return this;
  }

  default(components = {}, config = {}) {
    let { List, Detail } = components;
    if (!List || !Detail) throw new Error("Provide component for `index` and `detail`");

    let title = Object.assign({}, this.title(), config.title || {});

    return this.index(List, title.index, config)
      .new(Detail, title.new, config)
      .edit(Detail, title.edit, Object.assign({
        hidden: true
      }, config));
  }

  toObject() {
    if (this.config.childrens.length) return this.config;
  }

  permit(action) {
    return Permit.getInstance().isPermitted(this.path, action);
  }

  title() {
    return {
      index: `List ${this.name}`,
      new: `New ${singularize(this.name)}`,
      edit: `Edit ${singularize(this.name)}`
    }
  }

  routeName() {
    return {
      index: `List${unspace(this.name)}`,
      new: `New${singularize(unspace(this.name))}`,
      edit: `Edit${singularize(unspace(this.name))}`
    }
  }

  meta(title) {
    return {
      title,
      controller: this.path,
      actions: this.actions
    }
  }

  addAction(key, value) {
    this.actions[key] = value;
  }
}

function singularize(string) {
  return string.replace(/ies$/, 'ys').replace(/s$/, '');
}

function unspace(string) {
  return string.replace(/\s/, '')
}
