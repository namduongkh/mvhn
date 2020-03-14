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
        actionName: 'show',
        method: 'GET',
        path: `/${prefix}/{id}`,
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
        route.config = controller.routeConfig(controller, route.actionName, config);
        delete route.actionName;
        self.server.route(route);
      }
    });

    this.resourcesPrefix = prefix;
    this.resourcesController = controller;
    this.resourcesConfig = config;
    return this;
  }

  member(actionPath, method = 'GET', config = null) {
    if (!this.resourcesController) return;
    let path = [this.resourcesPrefix, actionPath].join('/');
    let controller = this.resourcesController;
    config = config || this.resourcesConfig;

    if (!method || typeof method == 'string') {
      method = {
        method: method
      }
    }

    if (!method.action) {
      method.action = actionPath;
    }

    this.server.route({
      method: method.method || 'GET',
      path: `/${path}`,
      config: controller.routeConfig(controller, method.action, config)
    });

    return this;
  }
}
