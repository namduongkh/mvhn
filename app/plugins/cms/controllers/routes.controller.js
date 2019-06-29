import _ from "lodash";

export default class Routes {
  constructor(server) {
    this.server = server;
    this.routeConfig = {
      auth: {
        strategy: 'jwt',
        scope: ['admin']
      }
    }
  }

  resources(controllerClass, prefix, model, config = {}) {
    this.server.route([
      this.initRoute('GET', prefix, '', controllerClass, 'index', model, config),
      this.initRoute('GET', prefix, 'select2', controllerClass, 'index', model, config),
      this.initRoute('GET', prefix, 'new', controllerClass, 'new', model, config),
      this.initRoute('POST', prefix, '', controllerClass, 'create', model, config),
      this.initRoute('GET', prefix, '{id}', controllerClass, 'show', model, config),
      this.initRoute('PUT', prefix, '{id}', controllerClass, 'update', model, config),
      this.initRoute('DELETE', prefix, '{id}', controllerClass, 'delete', model, config),
      this.initRoute('PUT', prefix, 'bulk_update_status', controllerClass, 'bulkUpdateStatus', model, config),
      this.initRoute('DELETE', prefix, 'bulk_delete', controllerClass, 'bulkDelete', model, config),
    ]);
  }

  initRoute(method = 'GET', prefix = '', path = '', controllerClass, actionName, model, config = {}) {
    let resourceConfig = {
      ...this.routeConfig,
      ...config
    }
    let fullPath = _.compact(['/cms', prefix, path]).join('/');
    let controllerObject = new controllerClass(model);

    return {
      method: method,
      path: fullPath,
      config: {
        id: path + ':' + _.compact([prefix, actionName]).join('/'),
        ...resourceConfig,
        async handler(request, h) {
          controllerObject.initRequest(request, h);
          return await controllerObject[actionName]();
        },
        ext: {
          onPreHandler: {
            async method(request, h) {
              controllerObject.initRequest(request, h);
              return await controllerObject.permit();
            }
          }
        }
      }
    }
  }
}