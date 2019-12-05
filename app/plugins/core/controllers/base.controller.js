import _ from "lodash";
import Boom from "boom";
import ServerRouterConfigure from "../classes/server_router_configure";

export default class BaseController {

  constructor(actionName) {
    if (!actionName) throw 'Please provide the action name!';
    this.actionName = actionName;
    this._context = {};
  }

  routeConfig(config = {}) {
    let that = this;
    let pre = ServerRouterConfigure.setPreHandler(this, this.actionName);
    if (pre && pre.length) {
      config.pre = pre;
    }
    return _.extend(config, {
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
        console.log("Route:", that.request.info);
        console.log("Route handler error:", error);
        throw Boom.notFound();
      }
    }
  }

  view(path, data = {}, options = {}) {
    return this.h.view(path, _.extend(data, this._context), options);
  }
}
