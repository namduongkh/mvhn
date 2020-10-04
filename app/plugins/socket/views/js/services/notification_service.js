import ResourceService from "@CmsCore/vue/general/resources_service";

export default class NotificationService {

  constructor() {
    this.service = new ResourceService(`${window.settings.services.webUrl}/notifications`)
    return this.service;
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new this();
    }

    return this.instance;
  }
}
