$(function () {
  $('.product-content__expander').on('click', function () {
    if ($('.product-content').hasClass('closed')) {
      $('.product-content').addClass('opened').removeClass('closed');
    } else if ($('.product-content').hasClass('opened')) {
      $('.product-content').addClass('closed').removeClass('opened');
    }
  });
});
