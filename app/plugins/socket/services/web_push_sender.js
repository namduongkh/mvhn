import webPush from 'web-push';

export default class WebPushSender {

  constructor(server) {
    const publicVapidKey = server.configManager.get("webPush.public");
    const privateVapidKey = server.configManager.get("webPush.private");

    webPush.setVapidDetails('mailto:test@example.com', publicVapidKey, privateVapidKey);
  }

  static getInstance(server) {
    if (!this.instance) {
      this.instance = new this(server);
    }

    return this.instance;
  }

  perform(subscription, data) {
    webPush.sendNotification(subscription, JSON.stringify(data))
      .catch(error => console.error(error));
  }
}
