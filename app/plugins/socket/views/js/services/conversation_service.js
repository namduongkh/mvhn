import ResourceService from "@CmsCore/vue/general/resources_service";

export default class ConversationService {

  constructor() {
    this.service = new ResourceService(`${window.settings.services.webUrl}/conversations`)
    return this.service;
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new this();
    }

    return this.instance;
  }
}
