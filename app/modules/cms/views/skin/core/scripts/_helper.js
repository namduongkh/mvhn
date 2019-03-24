/***************************************************
Description: Helpers
****************************************************/
var Helper = (function() {
    'use strict';
    return {
        detectScrollDirection: detectScrollDirection, // Bắt sự kiện scroll lên hoặc scroll xuống
        clearFileInput: clearFileInput, // Xóa nội dung input["file"]
        isUndefinedNullEmpty: isUndefinedNullEmpty, // Kiểm tra dữ liệu
        formatMoney: formatMoney, // Định dạng đơn vị tiền tệ
        enterFullScreen: enterFullScreen, // Bật chế độ xem toàn màn hình
        exitFullScreen: exitFullScreen, // Tắt chế độ xem toàn màn hình
        debounce: debounce, // Trì hoãn thực thi hàm khi hoàn thành thao tác
        throttle: throttle, // Trì hoãn thực thi hàm theo thời gian cố định
        hexToRgb: hexToRgb, // Chuyển đổi màu sắc Hex sang RGBA
        preloader: preloader, // Các tài nguyên sẽ được tải trước
        scrollToElement: scrollToElement, // Tự động cuộn tới đối tượng chỉ định
        scrollToTop: scrollToTop, // Tự động cuộn lên trên
        randomRangeFloat: randomRangeFloat, // Tạo số thực ngẫu nhiên
        randomRangeInt: randomRangeInt, // Tạo số nguyên ngẫu nhiên
        extend: extend // Kế thừa đối tượng
    };

    function detectScrollDirection() {
        var previousScroll = 0;

        $(window).on('scroll', function(event) {
            var currentScroll = $(this).scrollTop();
            if (currentScroll > previousScroll) {
                console.log('down');
            } else {
                console.log('up');
            }
            previousScroll = currentScroll;
        });
    }

    function clearFileInput(obj) {
        obj.replaceWith(obj.val('').clone(true));
    }

    function isUndefinedNullEmpty(data) {
        var output = true;
        if (!isNaN(data)) {
            output = false;
        } else if (data === null || data === undefined) {
            output = true;
        } else {
            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    output = false;
                }
            }
        }
        return output;
    }

    function formatMoney(number, places, symbol, thousand, decimal) {
        number = number || 0;
        places = !isNaN((places = Math.abs(places))) ? places : 0;
        symbol = symbol !== undefined ? symbol : '';
        thousand = thousand || '.';
        decimal = decimal || ',';
        var negative = number < 0 ? '-' : '',
            i = parseInt((number = Math.abs(+number || 0).toFixed(places)), 10) + '',
            j = (j = i.length) > 3 ? j % 3 : 0;
        return symbol +
            negative +
            (j ? i.substr(0, j) + thousand : '') +
            i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousand) +
            (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : '');
    }

    function enterFullScreen(element) {
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
    }

    function exitFullScreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }

    function debounce(fn, ms) {
        var timer = null;
        return function() {
            var context = this,
                args = arguments;
            clearTimeout(timer);
            timer = setTimeout(
                function() {
                    fn.apply(context, args);
                },
                ms
            );
        };
    }

    function throttle(fn, ms, scope) {
        ms || (ms = 250);
        var last, deferTimer;
        return function() {
            var context = scope || this;

            var now = +new Date(),
                args = arguments;
            if (last && now < last + ms) {
                clearTimeout(deferTimer);
                deferTimer = setTimeout(
                    function() {
                        last = now;
                        fn.apply(context, args);
                    },
                    ms
                );
            } else {
                last = now;
                fn.apply(context, args);
            }
        };
    }

    function hexToRgb(hex, opacity) {
        var h = hex.replace('#', '');
        h = h.match(new RegExp('(.{' + h.length / 3 + '})', 'g'));

        for (var i = 0; i < h.length; i++) {
            h[i] = parseInt(h[i].length == 1 ? h[i] + h[i] : h[i], 16);
        }

        if (typeof opacity != 'undefined') {
            h.push(opacity);
        }

        return 'rgba(' + h.join(',') + ')';
    }

    function preloader(fileList, callback) {
        var loaded = 0;
        var len = fileList.length;
        if (len) {
            for (var i = 0; i < len; i++) {
                var img = new Image();
                img.src = fileList[i];
                img.onload = function(event) {
                    check(len);
                    console.info('File loaded: ', event.target.currentSrc);
                };

                img.onerror = function(event) {
                    check(len);
                    console.info('Cannot load file: ', event.target.currentSrc);
                };
            }
        } else {
            complete();
        }

        function check(count) {
            loaded++;
            if (loaded === count) {
                complete();
            }
        }

        function complete() {
            if (typeof callback === 'function') {
                callback();
            }
        }
    }

    function scrollToElement(selector, time, verticalOffset) {
        time = typeof time !== 'undefined' ? time : 1000;
        verticalOffset = typeof verticalOffset !== 'undefined' ? verticalOffset : 0;
        var offset = $(selector).offset();
        var offsetTop = offset.top + verticalOffset;
        $('html,body').animate({ scrollTop: offsetTop }, time);
    }

    function scrollToTop(time) {
        time = typeof time !== 'undefined' ? time : 1000;
        $('html,body').animate({ scrollTop: 0 }, time);
    }

    function randomRangeFloat(min, max) {
        return Math.random() * (max - min + 1) + min;
    }

    function randomRangeInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function extend(a, b) {
        for (var key in b) {
            if (b.hasOwnProperty(key)) {
                a[key] = b[key];
            }
        }
        return a;
    }
})();

window.Helper = Helper;
export default Helper;