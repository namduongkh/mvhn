import axios from "axios";

window.CommonJS = {
  notifyPopup(context) {
    $('.modal:visible').not('#notify-popup').modal('hide');
    $('#notify-popup .modal-body .content').html(context);
    $('#notify-popup').modal('show');
  },
  scrollToTop(time = 500) {
    $('html,body').stop().animate({ scrollTop: 0 }, time);
  },
  scrollTo(selector, time = 500, cb = function () { }) {
    $('html,body').stop().animate({ scrollTop: $(selector).offset().top }, time, 'swing', cb);
  },
  scrollToBottomElement(selector, time = 500, cb = function () { }) {
    $(selector).stop().animate({ scrollTop: $(selector)[0].scrollHeight }, time, 'swing', cb);
  },
  elementSelectorPath(element) {
    let tagName = element[0].localName;

    let idName = element.prop('id');
    if (idName) idName = `#` + idName;

    let className = element.prop('class').split(' ').filter(function (i) { return !!i });
    if (className.length) {
      className = '.' + className.join('.')
    } else {
      className = null;
    }

    if (idName || className) {
      return [
        tagName,
        idName,
        className
      ].filter(function (i) { return !!i }).join('');
    } else {
      let parent = element.parent().first();

      return `${CommonJS.elementSelectorPath(parent)} ${tagName}:eq(${parent.find(tagName).index(element)})`;
    }
  }
}

$(function () {
  $('.modal').on('show.bs.modal', function () {
    $('.modal:visible').not($(this)).modal('hide');
  });

  bindAjaxRequesterEvent();
});

function bindAjaxRequesterEvent() {
  $('.ajax-requester').on('click', function () {
    let self = this;
    let url = $(self).data('url');
    let insertType = $(self).data('insert-type');
    let params = $(self).data('params') || {};
    let method = $(self).data('method') || 'GET'

    let requestConfig = {
      url,
      method
    };

    if (method == 'GET') {
      requestConfig.params = params;
    } else {
      requestConfig.data = params;
    }

    axios.request(requestConfig).then(({ data }) => {
      switch (insertType) {
        case 'before':
          $(self).before(data);
          break;
        case 'after':
          $(self).after(data);
          break;
        case 'replace':
          $(self).replaceWith(data);
          bindAjaxRequesterEvent();
          break;
      }
    });
  });
}
