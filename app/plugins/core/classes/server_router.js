import _ from "lodash";

export default class ServerRouter {
  constructor(server) {
    this.server = server;
  }

  resources(prefix, controller, options = {}, config = {}) {
    let { only, except } = options;
    only = Array.isArray(only) ? only : ['index', 'new', 'edit', 'create', 'update', 'delete'];
    except = Array.isArray(except) ? except : [];
    let accept = _.difference(only, except);

    let routeConfigs = [
      {
        actionName: 'index',
        method: 'GET',
        path: `/${prefix}`,
      },
      {
        actionName: 'new',
        method: 'GET',
        path: `/${prefix}/new`,
      },
      {
        actionName: 'edit',
        method: 'GET',
        path: `/${prefix}/{id}`,
      },
      {
        actionName: 'create',
        method: 'POST',
        path: `/${prefix}`,
      },
      {
        actionName: 'update',
        method: 'PUT',
        path: `/${prefix}/{id}`,
      },
      {
        actionName: 'delete',
        method: 'DELETE',
        path: `/${prefix}/{id}`,
      },
    ];

    let self = this;
    routeConfigs.forEach(function (route) {
      if (accept.includes(route.actionName)) {
        route.config = new controller(route.actionName).routeConfig(config);
        delete route.actionName;
        self.server.route(route);
      }
    });

    this.resourcesPrefix = prefix;
    this.resourcesController = controller;
    this.resourcesConfig = config;
    return this;
  }

  member(actionName, method = 'GET', config) {
    if (!this.resourcesController) return;
    let path = [this.resourcesPrefix, actionName].join('/');
    let controller = this.resourcesController;
    config = config || this.resourcesConfig;

    this.server.route({
      method,
      path: `/${path}`,
      config: new controller(actionName).routeConfig(config)
    });
    return this;
  }
}
