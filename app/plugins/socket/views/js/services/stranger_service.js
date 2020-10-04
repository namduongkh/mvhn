import ResourceService from "@CmsCore/vue/general/resources_service";

export default class StrangerService {

  constructor() {
    this.service = new ResourceService(`${window.settings.services.webUrl}/chat-cung-nguoi-la`)
    return this.service;
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new this();
    }

    return this.instance;
  }
}
