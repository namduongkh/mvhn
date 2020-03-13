import _ from "lodash";
import Boom from "boom";
import ServerRouterConfigure from "../classes/server_router_configure";

export default class BaseController {

  constructor(actionName) {
    if (!actionName) throw 'Please provide the action name!';
    this.actionName = actionName;
    this._context = {};
  }

  static routeConfig(controller, actionName, config) {
    let routeConfig = Object.assign({}, config);
    let pre = ServerRouterConfigure.setPreHandler(new controller(actionName), actionName);

    if (pre && pre.length) {
      routeConfig.pre = pre;
    }

    return _.extend(routeConfig, {
      handler: async function (request, h) {
        let instance = request.__instance || new controller(actionName);
        delete request.__instance;
        return await instance.routeHandler()(request, h);
      }
    });
  }

  routeConfig(config = {}) {
    let that = this;
    let routeConfig = Object.assign({}, config);
    let pre = ServerRouterConfigure.setPreHandler(this, this.actionName);
    if (pre && pre.length) {
      routeConfig.pre = pre;
    }
    return _.extend(routeConfig, {
      handler: that.routeHandler()
    });
  }

  routeHandler() {
    let that = this;
    return async function (request, h) {
      try {
        that.request = request;
        that.h = h;
        return await that[that.actionName]();
      } catch (error) {
        console.log("Route handler error:", {
          info: {
            href: that.request.url.href,
            referrer: that.request.info.referrer
          },
          error
        });
        if (error.isBoom) return error;
        return Boom.notFound();
      }
    }
  }

  view(path, data = {}, options = {}) {
    return this.h.view(path, _.extend(data, this._context), options);
  }
}
