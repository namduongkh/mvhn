import moment from 'moment';
const configManager = require('kea-config');
configManager.setup('./app/config');

export default {
  formatDate(date) {
    return moment(date).format('DD/MM/YYYY HH:mm');
  }
}