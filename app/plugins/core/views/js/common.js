window.CommonJS = {
  notifyPopup(context) {
    $('.modal').not('#notify-popup').modal('hide');
    $('#notify-popup .modal-body .content').html(context);
    $('#notify-popup').modal('show');
  }
}
