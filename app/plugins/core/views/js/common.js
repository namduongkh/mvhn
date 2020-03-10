window.CommonJS = {
  notifyPopup(context) {
    $('#notify-popup .modal-body .content').html(context);
    $('#notify-popup').modal('show');
  }
}
