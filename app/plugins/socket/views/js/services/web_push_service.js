import { request } from 'axios';

export default class WebPushService {

  perform() {
    this.triggerPushNotification().catch(error => console.error(error));
  }

  async triggerPushNotification() {
    if ('serviceWorker' in navigator) {
      const register = await navigator.serviceWorker.register('/sw.js', {
        scope: '/'
      });

      const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: this.urlBase64ToUint8Array(window.settings.publicVapidKey),
      });

      await request('/web_pushes/subscribe', {
        method: 'POST',
        data: JSON.stringify(subscription),
        headers: {
          'Content-Type': 'application/json'
        },
      });
    } else {
      console.error('Service workers are not supported in this browser');
    }
  }

  urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }
}
