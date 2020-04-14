import axios from "axios";

window.CommonJS = {
  notifyPopup(context) {
    $('.modal:visible').not('#notify-popup').modal('hide');
    $('#notify-popup .modal-body .content').html(context);
    $('#notify-popup').modal('show');
  },
  scrollToTop(time = 500) {
    $('html,body').animate({ scrollTop: 0 }, time);
  },
  scrollTo(selector, time = 500, cb = function () { }) {
    $('html,body').animate({ scrollTop: $(selector).offset().top }, time, 'swing', cb);
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
