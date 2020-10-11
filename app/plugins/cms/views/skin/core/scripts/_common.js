var Common = (function () {
  'use strict';

  $(window).on('load', function () {
    closeLoadingPage();
  });

  // Fixed Nav
  var lastScrollTop = 0;
  function onScrollHandle() {
    var wScroll = $(this).scrollTop();
    if (wScroll === 0 || wScroll > $('header.site-header').height()) {
      if (wScroll === 0 || wScroll < lastScrollTop) {
        $('header.site-header').removeClass('slide-up').addClass('slide-down');
      } else {
        $('header.site-header').removeClass('slide-down').addClass('slide-up');
      }
    }
    lastScrollTop = wScroll;
  }
  $(window).on('scroll', onScrollHandle);
  $('.side-menu').on('scroll', onScrollHandle);

  jQuery(function () {
    registerMalihuCustomScroll();
    $('.none').removeClass('none');
    // $(".list-fancybox").slick({
    //   dots: true
    // });

  });
  return {
    registerMalihuCustomScroll
  };


  function registerMalihuCustomScroll() {
    var $scroller = $('.custom-scrollbar');
    for (var i = 0; i < $scroller.length; i++) {
      var item = $($scroller[i]);
      var isScroll = item.attr('is-scroll') == 'false' ? false : true;
      item.mCustomScrollbar({
        autoHideScrollbar: true,
        scrollbarPosition: item.attr('scroll-position') || 'inside',
        theme: item.attr('scroll-theme') || 'light-3',
        axis: item.attr('axis') || 'y',
        advanced: { autoExpandHorizontalScroll: item.attr('advanced') || false },
        scrollInertia: 0,
        mouseWheel: { enable: isScroll }
      });
    }
  }

  function closeLoadingPage() {
    $("#preloader").fadeOut();
    $(".view-container").removeClass("visibility");
  }
})();

window.Common = Common
export default Common;
