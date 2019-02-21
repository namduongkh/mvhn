import moment from 'moment';
const configManager = require('kea-config');
configManager.setup('./app/config');

export default {
  formatDate(date, format = 'DD/MM/YYYY HH:mm') {
    return moment(date).format(format);
  },
  dayOfWeekName(day) {
    switch (day) {
      case 1:
        return 'Monday';
      case 2:
        return 'Tuesday';
      case 3:
        return 'Wednesday';
      case 4:
        return 'Thurday';
      case 5:
        return 'Friday';
      case 6:
        return 'Saturday';
      case 0, 7:
        return 'Sunday';
    }
  },
  activityClass(activity) {
    let class_name = "";
    let date = moment(activity.date).startOf('d');
    let curdate = moment().startOf('d');
    if (curdate < date) {
      class_name = "future";
    } else if (curdate.format('DDMMYYYY') == date.format('DDMMYYYY')) {
      class_name = "today";
    } else {
      class_name = "past";
      if (activity.reached)
        class_name += " reached";
    }
    return class_name;
  }
}