import _ from "lodash";

export default class BaseController {

  constructor(actionName) {
    if (!actionName) throw 'Please provide the action name!';
    this.actionName = actionName;
  }

  routeConfig(config = {}) {
    let that = this;
    let pre = that.getPreHandler();
    if (pre.length) {
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
        console.log("Route handler error:", error);
        return null;
      }
    }
  }

  getPreHandler() {
    let that = this;
    let beforeActions = this.beforeActions();
    let pre = [];
    for (let action in beforeActions) {
      if (beforeActions[action][0].includes(this.actionName)) {
        pre.push({
          method: async function (request, h) {
            that.request = request;
            that.h = h;
            let result = await that[action]();
            return result || null;
          },
          assign: beforeActions[action][1] || action
        })
      }
    }
    return pre;
  }
}