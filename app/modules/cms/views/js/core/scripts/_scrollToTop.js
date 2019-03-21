class ScrollTopTopScript {
    constructor() {
        this.$mod = $('#mod-scroll-to-top');
        this.scroller();
    }

    scroller() {
        var _this = this;
        $(window).scroll(function() {
            if ($(this).scrollTop() > 100) {
                _this.$mod.fadeIn(300);
            } else {
                _this.$mod.fadeOut(300);
            }
        });

        _this.$mod.click(function() {
            $('html, body').animate({
                    scrollTop: 0
                },
                600
            );
            return false;
        });
    }
}
export default ScrollTopTopScript;