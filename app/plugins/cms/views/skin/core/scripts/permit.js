export default class Permit {

  static getInstance(accessibles = []) {
    if (!this.instance) this.instance = new Permit(accessibles);
    return this.instance;
  }

  constructor(accessibles = []) {
    if (typeof window != 'undefined') {
      accessibles = Object.assign([], window.accessibles);
      let bindingElem = document.getElementById('accessibles_binding');
      if (bindingElem) bindingElem.remove();
    }
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
