export default class ServerRouterConfigure {
  static setPreHandler(controller, actionName) {
    if (typeof controller.beforeActions != 'function') return [];

    let beforeActions = controller.beforeActions();
    let pre = [];

    for (let action in beforeActions) {
      for (let i in beforeActions[action]) {
        let appliedAction = beforeActions[action][i];
        let appliedActionName = Array.isArray(appliedAction) ? appliedAction[0] : appliedAction;
        let assignVariableName = Array.isArray(appliedAction) ? appliedAction[1] : action;

        if (appliedActionName.includes(actionName)) {
          pre.push({
            method: async function (request, h) {
              controller.request = request;
              controller.h = h;

              return (await controller[action]()) || null;
            },
            assign: assignVariableName
          })
        }
      }
    }

    return pre;
  }
}
