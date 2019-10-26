import _ from "lodash";
import Boom from "boom";

export default class BaseController {

  constructor(actionName) {
    if (!actionName) throw 'Please provide the action name!';
    this.actionName = actionName;
    this._context = {};
  }

  routeConfig(config = {}) {
    let that = this;
    let pre = that.getPreHandler();
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

  getPreHandler() {
    if (typeof this.beforeActions != 'function') return;
    let that = this;
    let beforeActions = this.beforeActions();
    let pre = [];
    for (let action in beforeActions) {
      for (let i in beforeActions[action]) {
        let appliedAction = beforeActions[action][i];

        if (appliedAction[0].includes(this.actionName)) {
          pre.push({
            method: async function (request, h) {
              that.request = request;
              that.h = h;
              return (await that[action]()) || null;
            },
            assign: appliedAction[1] || action
          })
        }
      }
    }
    return pre;
  }

  view(path, data = {}, options = {}) {
    return this.h.view(path, _.extend(data, this._context), options);
  }
}