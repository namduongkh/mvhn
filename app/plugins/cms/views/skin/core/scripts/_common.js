var Common = (function () {
  'use strict';

  $(window).on('load', function () {
    closeLoadingPage();
  });

  // Fixed Nav
  var lastScrollTop = 0;
  $(window).on('scroll', function () {
    var wScroll = $(this).scrollTop();
    if (wScroll > $('header.site-header').height()) {
      if (wScroll < lastScrollTop) {
        $('header.site-header').removeClass('slide-up').addClass('slide-down');
      } else {
        $('header.site-header').removeClass('slide-down').addClass('slide-up');
      }
    }
    lastScrollTop = wScroll
  });

  $(document).ready(function () {
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
