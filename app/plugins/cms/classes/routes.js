import _ from "lodash";
import mongoose from "mongoose";
import Boom from "boom";
import PermitService from "../services/permit_service";
import ServerRouterConfigure from "../../core/classes/server_router_configure";

export default class Routes {
  constructor(server, prefix = null, options = {}) {
    this.server = server;
    this.configManager = this.server.configManager;
    this.prefix = prefix;
    this.options = _.merge({
      routeConfig: {
        auth: {
          strategy: 'jwt'
        }
      }
    }, options);
  }

  resources(controllerClass, prefix, model, routeConfig = {}) {
    this.prefix = prefix || this.prefix;

    this.server.route([
      this.initRoute('GET', this.prefix, '', controllerClass, 'index', model, routeConfig),
      this.initRoute('GET', this.prefix, 'select2', controllerClass, 'index', model, routeConfig),
      this.initRoute('GET', this.prefix, 'new', controllerClass, 'new', model, routeConfig),
      this.initRoute('POST', this.prefix, '', controllerClass, 'create', model, routeConfig),
      this.initRoute('GET', this.prefix, '{id}', controllerClass, 'edit', model, routeConfig),
      this.initRoute('PUT', this.prefix, '{id}', controllerClass, 'update', model, routeConfig),
      this.initRoute('DELETE', this.prefix, '{id}', controllerClass, 'delete', model, routeConfig),
      this.initRoute('PUT', this.prefix, 'bulk_update_status', controllerClass, 'bulkUpdateStatus', model, routeConfig),
      this.initRoute('POST', this.prefix, 'bulk_delete', controllerClass, 'bulkDelete', model, routeConfig),
      this.initRoute('GET', this.prefix, 'import_model', controllerClass, 'importModel', model, routeConfig),
    ]);

    return this;
  }

  customRoute(method = 'GET', path, controllerClass, actionName, model, routeConfig = {}) {
    let prefix = this.prefix || '';
    let pathString = path.replace(prefix, '');

    this.server.route(this.initRoute(method, prefix, pathString, controllerClass, actionName, model, routeConfig));
    return this;
  }

  initRoute(method = 'GET', prefix = '', path = '', controllerClass, actionName, model, routeConfig = {}) {
    let resourceConfig = {
      ...this.options.routeConfig,
      ...routeConfig
    }
    let fullPath = _.compact(['/' + this.configManager.get('web.context.cmsprefix'), prefix, path]).join('/');

    return {
      method: method,
      path: fullPath,
      config: {
        pre: ServerRouterConfigure.setPreHandler(new controllerClass(model), actionName, this.options),
        id: path + ':' + _.compact([prefix, actionName]).join('/'),
        ...resourceConfig,
        async handler(request, h) {
          let controllerObject = new controllerClass(model, request, h);
          return await controllerObject[actionName]();
        },
        ext: {
          onPreHandler: { method: this.permit.bind(this) }
        }
      }
    };
  }

  async permit(request, h) {
    let routePath = request.route.settings.id.split(":")[0];
    let routeId = request.route.settings.id.split(":")[1];

    let allowedActions = this.allowedActions();
    for (let i in allowedActions) {
      if (routePath.includes(allowedActions[i])) return h.continue;
    }

    let { scope } = request.auth.credentials;
    let accessibles = await PermitService.accessibles(scope);

    if (new PermitService(accessibles).checkPermit(routeId)) return h.continue;

    throw Boom.forbidden("Forbidden");
  }

  allowedActions() {
    return ['select2'];
  }
}
