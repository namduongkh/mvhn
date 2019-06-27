import Boom from "boom";
import _ from "lodash";
import mongoose from "mongoose";

const UserGroup = mongoose.model('UserGroup');
const UserRight = mongoose.model('UserRight');

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

    return {
      method: method,
      path: fullPath,
      config: {
        id: path + ':' + _.compact([prefix, actionName]).join('/'),
        ...resourceConfig,
        async handler(request, h) {
          let controllerObject = new controllerClass(request, h, model);
          return await controllerObject[actionName]();
        },
        ext: {
          onPreHandler: { method: this.permit }
        }
      }
    }
  }

  async permit(request, h) {
    let routeId = request.route.settings.id.split(":")[1];
    let routeSplited = routeId.split('/');
    let controller = routeSplited.shift();
    let action = routeSplited;

    let { scope } = request.auth.credentials;
    let groups = await UserGroup.find({
      slug: { $in: scope }
    }, "allowedRights").lean();

    let rightIds = _.compact(_.map(groups, 'allowedRights'));
    let rights = await UserRight.find({
      _id: { $in: rightIds },
      controller: { $regex: new RegExp(controller) },
      action: { $regex: new RegExp(action) },
    }, "_id").lean();

    if (rights.length) {
      return h.continue
    } else {
      throw Boom.badRequest('No permit');
    }
  }
}