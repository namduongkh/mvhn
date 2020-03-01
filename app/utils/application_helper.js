import moment from 'moment';

Number.prototype.currency = function (n, x) {
  var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
  return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
};

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
  },

  getAssets(assets, templateName) {
    return assets[templateName] || assets;
  },

  currency(number, unit = 'đ') {
    return number.currency() + unit;
  },

  timeFrom(value) {
    let diff = moment().diff(moment(value), 'minutes');
    return `${diff} minutes ago`;
  },

  text2Slug(string, splitor = '') {
    if (string) {
      //Đổi chữ hoa thành chữ thường
      var slug = string.toLowerCase();

      //Đổi ký tự có dấu thành không dấu
      slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
      slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
      slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
      slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
      slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
      slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
      slug = slug.replace(/đ/gi, 'd');
      //Xóa các ký tự đặt biệt
      slug = slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '');
      //Đổi khoảng trắng thành ký tự gạch ngang
      slug = slug.replace(/ /gi, "-");
      //Đổi nhiều ký tự gạch ngang liên tiếp thành 1 ký tự gạch ngang
      //Phòng trường hợp người nhập vào quá nhiều ký tự trắng
      slug = slug.replace(/\-\-\-\-\-/gi, '-');
      slug = slug.replace(/\-\-\-\-/gi, '-');
      slug = slug.replace(/\-\-\-/gi, '-');
      slug = slug.replace(/\-\-/gi, '-');
      //Xóa các ký tự gạch ngang ở đầu và cuối
      slug = '@' + slug + '@';
      slug = slug.replace(/\@\-|\-\@|\@/gi, '');
      if (splitor) {
        slug = slug.replace(/-/gi, splitor);
      }
      return slug;
    }
    return string;
  },

  orderStatus(status) {
    return {
      'ordering': '<span class="label label-default">Đang chọn hàng</span>',
      'ordered': '<span class="label label-primary">Đã đặt hàng</span>',
      'active': '<span class="label label-success">Đang xử lý</span>',
      'ready': '<span class="label label-info">Đã sẵn sàng</span>',
      'delivering': '<span class="label label-success">Đang vận chuyển</span>',
      'delivered': '<span class="label label-secondary">Đã vận chuyển</span>',
      'done': '<span class="label label-default">Hoàn thành</span>',
      'cancel': '<span class="label label-danger">Đã hủy bỏ</span>'
    }[status];
  },

  province(id) {
    if (!id) return;
    let { Provinces } = require(BASE_PATH + '/app/plugins/cms/views/skin/core/vue/general/constants.js');
    return Provinces.find(option => option.id + "" == id + "")
      .text;
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
