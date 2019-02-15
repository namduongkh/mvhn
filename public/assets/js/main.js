window.Common = {
  showLoader(ms = 0) {
    $('.page-loader').fadeIn(ms);
  },
  hideLoader(ms = 250) {
    $('.page-loader').fadeOut(ms);
    let logo = $('#logo-title');
    if (!logo.hasClass('logo'))
      logo.addClass('logo');
  },
  scrollTo(selector) {
    if (selector && selector.length) {
      $('html, body').animate({
        scrollTop: (selector.offset().top - 120)
      }, 200);
    }
  }
}

$(() => {
  Common.hideLoader();
});