import _ from "lodash";
import mongoose from "mongoose";
import Boom from "boom";
import PermitService from "../services/permit_service";

const UserGroup = mongoose.model('UserGroup');
const UserRight = mongoose.model('UserRight');

export default class Routes {
  constructor(server, prefix = null) {
    this.server = server;
    this.configManager = this.server.configManager;
    this.prefix = prefix;
    this.routeConfig = {
      auth: {
        strategy: 'jwt',
        // scope: ['admin']
      }
    }
  }

  resources(controllerClass, prefix, model, config = {}) {
    prefix = prefix || this.prefix;

    this.server.route([
      this.initRoute('GET', prefix, '', controllerClass, 'index', model, config),
      this.initRoute('GET', prefix, 'select2', controllerClass, 'index', model, config),
      this.initRoute('GET', prefix, 'new', controllerClass, 'new', model, config),
      this.initRoute('POST', prefix, '', controllerClass, 'create', model, config),
      this.initRoute('GET', prefix, '{id}', controllerClass, 'edit', model, config),
      this.initRoute('PUT', prefix, '{id}', controllerClass, 'update', model, config),
      this.initRoute('DELETE', prefix, '{id}', controllerClass, 'delete', model, config),
      this.initRoute('PUT', prefix, 'bulk_update_status', controllerClass, 'bulkUpdateStatus', model, config),
      this.initRoute('POST', prefix, 'bulk_delete', controllerClass, 'bulkDelete', model, config),
    ]);
  }

  customRoute(method = 'GET', path, controllerClass, actionName, model, config = {}) {
    let prefix = this.prefix || '';
    let pathString = path.replace(prefix, '');

    this.server.route(this.initRoute(method, prefix, pathString, controllerClass, actionName, model, config));
  }

  initRoute(method = 'GET', prefix = '', path = '', controllerClass, actionName, model, config = {}) {
    let resourceConfig = {
      ...this.routeConfig,
      ...config
    }
    let fullPath = _.compact(['/' + this.configManager.get('web.context.cmsprefix'), prefix, path]).join('/');

    return {
      method: method,
      path: fullPath,
      config: {
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
    }
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
