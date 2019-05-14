import moment from 'moment';
import mongoose from 'mongoose';

export default {
  formatDate(date, format = 'DD/MM/YYYY HH:mm') {
    return moment(date).format(format);
  },

  partialPath(partial) {
    return (BASE_PATH + '/app/plugins/' + partial).replace('//', '/');
  },

  postThumbImage(post, defaultImg = '/assets/webmag/img/post-1.jpg') {
    let thumb = post.thumb || defaultImg;
    return `
    <a class="post-img" href="/posts/${post.slug}" title="${post.title}">
      <img src="${defaultImg}" alt="${post.title}" class="hide-img">
      <img src="${thumb}" alt="${post.title}" class="show-img">
    </a>
    `
  },

  dayOfWeekName(day) {
    // switch (day) {
    //   case 1:
    //     return 'Monday';
    //   case 2:
    //     return 'Tuesday';
    //   case 3:
    //     return 'Wednesday';
    //   case 4:
    //     return 'Thursday';
    //   case 5:
    //     return 'Friday';
    //   case 6:
    //     return 'Saturday';
    //   case 0, 7:
    //     return 'Sunday';
    // }
    return moment().weekday(day).format('dddd');
  },
  activityClass(activity) {
    if (!activity.enabled) {
      return "disabled";
    }
    let class_name = "";
    let date = moment(activity.date).startOf('d');
    let curdate = moment().startOf('d');
    if (curdate < date) {
      class_name = "future";
    } else if (curdate.format('DDMMYYYY') == date.format('DDMMYYYY')) {
      class_name = "today";
    } else {
      class_name = "past";
      if (activity.completed)
        class_name += " completed";
    }
    return class_name;
  }
}