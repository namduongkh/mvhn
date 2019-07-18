import PermitServer from "@Plugin/cms/services/permit";

export default class Permit extends PermitServer {
  static getInstance() {
    if (!this.instance) this.instance = new Permit();
    return this.instance;
  }
  
  constructor() {
    if (typeof window != 'undefined') {
      super(Object.assign([], window.accessibles));
      let bindingElem = document.getElementById('accessibles_binding');
      if (bindingElem) bindingElem.remove();
    }
  }
}
