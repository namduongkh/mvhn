import moment from 'moment';
import mongoose from 'mongoose';

const Property = mongoose.model('Property');

export default {
  formatDate(date, format = 'DD/MM/YYYY HH:mm') {
    return moment(date).format(format);
  },

  partialPath(partial) {
    return (BASE_PATH + '/app/plugins/' + partial).replace('//', '/');
  },

  postThumbImage(post, defaultImg = '/assets/webmag/img/post-1.jpg') {
    let bgColor = (post.category && post.category.color) || randomColor();
    let image = `<img src="${post.thumb}" alt="${post.title}" class="show-img">`;
    if (!post.thumb) {
      image = `<h4 class="show-img">${post.title}</h4>`
    }

    return `
      <a class="post-img" href="/posts/${post.slug}" title="${post.title}" style="background-color: ${bgColor}">
        <img src="${defaultImg}" alt="${post.title}" class="hide-img">
        ${image}
      </a>
    `;
  },

  productThumbImage(product, defaultImg = '/assets/webmag/img/post-1.jpg') {
    let bgColor = '#eee';
    let image = `<img src="${product.thumb}" alt="${product.name}" class="show-img">`;
    if (!product.thumb) {
      image = `<h4 class="show-img">${product.name}</h4>`
    }

    return `
      <a class="post-img" href="/products/${product.slug}" title="${product.name}" style="background-color: ${bgColor}">
        <img src="${defaultImg}" alt="${product.name}" class="hide-img">
        ${image}
      </a>
    `;
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
  },

  logoBinder(logo, text = '', title = '', options = {}) {
    let optionsHtml = '';
    for (let i in options) {
      optionsHtml += ` ${i}="${options[i]}"`;
    }
    if (logo) {
      return `<img src="${logo}" alt="${title}" ${optionsHtml}>`;
    } else {
      text = text || title;
      return `<div class="logo-text__wrapper"><span class="logo-text" ${optionsHtml}>${text}</span></div>`;
    }
  }
}

function randomColor() {
  let r = Math.round(Math.random() * 255);
  let g = Math.round(Math.random() * 255);
  let b = Math.round(Math.random() * 255);

  return rgbToHex(r, g, b);
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}
