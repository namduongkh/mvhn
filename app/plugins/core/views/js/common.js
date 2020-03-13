window.CommonJS = {
  notifyPopup(context) {
    $('.modal:visible').not('#notify-popup').modal('hide');
    $('#notify-popup .modal-body .content').html(context);
    $('#notify-popup').modal('show');
  }
}

$(function () {
  $('.modal').on('show.bs.modal', function () {
    $('.modal:visible').not($(this)).modal('hide');
  });
});
