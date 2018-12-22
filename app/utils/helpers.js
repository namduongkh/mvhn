const configManager = require('kea-config');
configManager.setup('./app/config');

export default {
  assetVersion(fileUrl) {
    return `${fileUrl}?v=${configManager.get('web.assetVersion')}`
  }
}