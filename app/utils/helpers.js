import moment from 'moment';
const configManager = require('kea-config');
configManager.setup('./app/config');

export default {
  formatDate(date, format = 'DD/MM/YYYY HH:mm') {
    return moment(date).format(format);
  },
  dayOfWeekName(day) {
    switch (day) {
      case 0:
        return 'Monday';
      case 1:
        return 'Tuesday';
      case 2:
        return 'Wednesday';
      case 3:
        return 'Thurday';
      case 4:
        return 'Friday';
      case 5:
        return 'Saturday';
      case 6:
        return 'Sunday';
    }
  }
}