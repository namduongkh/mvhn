$(function () {
  $('.activity').magnificPopup({
    type: 'inline',
    preloader: false,
    focus: '#username',
    modal: true
  });
  $(document).on('click', '.activity-modal-dismiss', function (e) {
    e.preventDefault();
    $.magnificPopup.close();
  });
});