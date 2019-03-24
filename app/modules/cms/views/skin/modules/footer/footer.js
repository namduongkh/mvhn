// class Footer {
//     constructor() {
//         this.$modMenu = $("#mod-menu");
//         this.$parFooter = $('#partials-footer');
//         this.$viewContainer = $('.view-container');
//
//         window.addEventListener('load', function() {
//             window.Footer.setPositionFooter();
//         });
//         window.addEventListener('resize', function() {
//             window.Footer.setPositionFooter();
//         });
//     }
//     setPositionFooter() {
//         var _this = this;
//         var winH = $(window).height();
//         var contentH = _this.$viewContainer.height();
//         var MenuH = _this.$modMenu.height();
//
//         _this.$parFooter.css("visibility", "visible");
//         if (winH < (contentH + MenuH)) {
//             _this.$parFooter.css('position', 'relative');
//         } else {
//             _this.$parFooter.css('position', 'fixed');
//         }
//     }
// }
// let footer = new Footer();
// export default footer;
// window.Footer = footer;