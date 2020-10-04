import ResourceService from "@CmsCore/vue/general/resources_service";

export default class MessageService {

  constructor(conversationId) {
    this.service = new ResourceService(`${window.settings.services.webUrl}/conversations/${conversationId}/messages`);
    return this.service;
  }

  static getInstance(conversationId) {
    if (!this.instance) {
      this.instance = new this(conversationId);
    }

    return this.instance;
  }
}
