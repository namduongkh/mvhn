export default class Permit {

  constructor(accessibles = []) {
    this.accessibles = accessibles;
    this.permitChecked = {};
  }

  isPermitted(controller, action) {
    let fullPath = `${controller}/${action}`;

    if (!this.permitChecked.hasOwnProperty(fullPath)) {
      this.permitChecked[fullPath] = this.checkPermit(fullPath);
    }
    return this.permitChecked[fullPath];
  }

  checkPermit(fullPath) {
    for (let i in this.accessibles) {
      let right = this.accessibles[i];
      let matched = fullPath.match(new RegExp(right));
      if (matched && matched[0] == fullPath) {
        return true;
      }
    }
    return false;
  }
}
