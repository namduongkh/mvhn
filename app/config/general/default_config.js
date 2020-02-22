'use strict';

module.exports = {
    assets: {
        cms: {
            required: [
                'script-loader?!jquery',
                'jquery-mousewheel',
                'tether',
                'bootstrap',
                'bootstrap-daterangepicker',
                'flatpickr',
                'cropper',
                /////////////////
                'bootstrap/dist/css/bootstrap.css',
                'font-awesome/scss/font-awesome.scss',
                'cropper/dist/cropper.css',
                'froala-editor/js/froala_editor.pkgd.min',
                'froala-editor/css/froala_editor.pkgd.min.css',
                'froala-editor/css/froala_style.min.css',
                'jsoneditor/dist/jsoneditor.min.css',
                'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css',
                'vue-datetime/dist/vue-datetime.css',
            ],
            css: [
                CMS_BUNDLE_PATH + '/styles/vendor.css',
                '//cdnjs.cloudflare.com/ajax/libs/fancybox/3.1.20/jquery.fancybox.min.css',
                '//cdnjs.cloudflare.com/ajax/libs/magnific-popup.js/1.1.0/magnific-popup.min.css',
                'public/cms/assets/startui/css/separate/main.min.css',
                'public/cms/assets/css/all.min.css',
                CMS_BUNDLE_PATH + '/styles/main.css',
            ],
            js: [
                CMS_BUNDLE_PATH + '/scripts/vendor.js',
                '//cdnjs.cloudflare.com/ajax/libs/socket.io/2.0.3/socket.io.js',
                '//cdnjs.cloudflare.com/ajax/libs/fancybox/3.1.20/jquery.fancybox.min.js',
                '//cdnjs.cloudflare.com/ajax/libs/magnific-popup.js/1.1.0/jquery.magnific-popup.min.js',
                CMS_BUNDLE_PATH + '/scripts/main.js',
                CMS_BUNDLE_PATH + '/scripts/common.js'
            ]
        },
        required: [
            'script-loader?!jquery',
            'jquery-mousewheel',
            'tether',
            'bootstrap',
            'bootstrap-daterangepicker',
            'flatpickr',
            'slick-carousel',
            'select2',
            // 'toastr',
            // 'cropper',
            /////////////////
            'toastr/build/toastr.css',
            'slick-carousel/slick/slick.css',
            'slick-carousel/slick/slick-theme.css',
            'select2/dist/css/select2.min.css',
            'vue-datetime/dist/vue-datetime.css',
            // 'bootstrap/dist/css/bootstrap.css',
            'font-awesome/scss/font-awesome.scss',
            // 'cropper/dist/cropper.css',
            // 'froala-editor/css/froala_editor.pkgd.min.css',
            // 'froala-editor/css/froala_style.min.css',
            // 'jsoneditor/dist/jsoneditor.min.css'
        ],
        include: {
            css: [
                'public/vendor/bootstrap/css/bootstrap_v2.min.css',
                // 'public/vendor/fontawesome-free/css/all.min.css',
                // 'https://fonts.googleapis.com/css?family=Montserrat:400,700',
                // 'https://fonts.googleapis.com/css?family=Lato:400,700,400italic,700italic',
                // 'public/vendor/font-awesome/css/font-awesome.min.css',
                'public/cms/assets/css/all.min.css',
                // 'public/vendor/magnific-popup/magnific-popup.css',
                // '//cdnjs.cloudflare.com/ajax/libs/jScrollPane/2.2.1/style/jquery.jscrollpane.min.css',
                BUNDLE_PATH + '/styles/vendor.css',
                BUNDLE_PATH + '/styles/main.css',
                '//fonts.googleapis.com/css?family=Nunito+Sans:700%7CNunito:300,600',
            ],
            js: [
                // 'public/vendor/jquery/jquery.min.js',
                // 'public/vendor/jquery-easing/jquery.easing.min.js',
                // 'public/vendor/magnific-popup/jquery.magnific-popup.min.js',
                // '//cdnjs.cloudflare.com/ajax/libs/jScrollPane/2.2.1/script/jquery.jscrollpane.min.js',
                BUNDLE_PATH + '/commons.js',
                BUNDLE_PATH + '/scripts/vendor.js',
                // 'public/vendor/bootstrap/js/bootstrap.bundle.min.js',
                BUNDLE_PATH + '/scripts/main.js',
            ]
        }
    }
}
