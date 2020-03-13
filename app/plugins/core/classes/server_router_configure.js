import mongoose from "mongoose";
import Boom from "boom";
import _ from "lodash";

export default class ServerRouterConfigure {
  static setPreHandler(controller, actionName, options = {}) {
    this.options = options;

    return [
      ...this.loadParentObject(),
      ...this.fromBeforeActions(controller, actionName)
    ];
  }

  static fromBeforeActions(controller, actionName) {
    if (typeof controller.beforeActions != 'function') return [];

    let beforeActions = controller.beforeActions();
    let pre = [];

    for (let action in beforeActions) {
      if (!beforeActions[action].length) {
        pre.push({
          method: async function (request, h) {
            let instance = request.__instance || controller;

            instance.request = request;
            instance.h = h;

            request.__instance = instance;
            return await instance[action]();
          },
          assign: action
        });
        return;
      }

      for (let i in beforeActions[action]) {
        let appliedAction = beforeActions[action][i];
        let appliedActionName = Array.isArray(appliedAction) ? appliedAction[0] : appliedAction;
        let assignVariableName = Array.isArray(appliedAction) ? appliedAction[1] || action : action;

        if (appliedActionName.includes(actionName)) {
          pre.push({
            method: async function (request, h) {
              controller.request = request;
              controller.h = h;

              return (await controller[action]()) || null;
            },
            assign: assignVariableName
          });
        }
      }
    }

    return pre;
  }

  static loadParentObject() {
    if (!this.options.parentObjectConfig) return [];

    let { param, model, attribute } = this.options.parentObjectConfig;

    return [{
      method: async function (request, h) {
        let MODEL = mongoose.model(model);
        let id = request.params[param] || request.query[param];

        let object = await MODEL.findById(id).lean();

        if (!object) throw Boom.badRequest('Not found parent object `' + param + '`');

        if (attribute) {
          if (request.payload) request.payload[attribute] = object._id;
          request.query[attribute] = object._id;
        }

        delete request.query[param];
        return object;
      },
      assign: param
    }];
  }
}
