'use strict';

/*Chứa config chung của dev frontend thường xuyên thay đổi mỗi dự án*/

module.exports = {
    assets: {
        required: [
            // 'script-loader?!jquery',
            // 'jquery-mousewheel',
            // 'tether',
            // 'bootstrap',
            // 'script-loader?!magnific-popup',
            // 'bootstrap-daterangepicker',
            // 'flatpickr',
            // 'cropper',
            /////////////////
            // 'bootstrap/dist/css/bootstrap.css',
            // 'font-awesome/scss/font-awesome.scss',
            // 'magnific-popup/src/css/main.scss',
            // 'cropper/dist/cropper.css',
            // 'froala-editor/css/froala_editor.pkgd.min.css',
            // 'froala-editor/css/froala_style.min.css',
            // 'jsoneditor/dist/jsoneditor.min.css'
        ],
        include: {
            css: [
                // 'public/src/styles/vendor.css',
                'public/vendor/bootstrap/css/bootstrap.min.css',
                'public/vendor/fontawesome-free/css/all.min.css',
                'https://fonts.googleapis.com/css?family=Montserrat:400,700',
                'https://fonts.googleapis.com/css?family=Lato:400,700,400italic,700italic',
                'public/vendor/magnific-popup/magnific-popup.css',
                // 'https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.1.20/jquery.fancybox.min.css',
                // 'https://cdnjs.cloudflare.com/ajax/libs/magnific-popup.js/1.1.0/magnific-popup.min.css',
                'public/src/styles/main.css',
                // 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.css',
                // 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick-theme.min.css',
                // 'https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.css',
                // 'https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.6-rc.0/css/select2.min.css',
                // 'https://cdn.jsdelivr.net/jquery.mcustomscrollbar/3.0.6/jquery.mCustomScrollbar.min.css'

            ],
            js: [
                // 'public/src/scripts/vendor.js',
                'public/vendor/jquery/jquery.min.js',
                'public/vendor/bootstrap/js/bootstrap.bundle.min.js',
                'public/vendor/jquery-easing/jquery.easing.min.js',
                'public/vendor/magnific-popup/jquery.magnific-popup.min.js',
                // 'https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.0.3/socket.io.js',
                // 'https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.1.20/jquery.fancybox.min.js',
                // 'https://cdnjs.cloudflare.com/ajax/libs/magnific-popup.js/1.1.0/jquery.magnific-popup.min.js',
                // 'https://www.gstatic.com/firebasejs/5.0.4/firebase.js',
                // 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.js',
                // 'https://cdnjs.cloudflare.com/ajax/libs/jquery.isotope/3.0.6/isotope.pkgd.js',
                'public/src/scripts/main.js',
                // 'public/src/scripts/common.js',
                // 'http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js',
                // 'https://cdn.jsdelivr.net/jquery.mcustomscrollbar/3.0.6/jquery.mCustomScrollbar.concat.min.js'
            ]
        }
    }
};