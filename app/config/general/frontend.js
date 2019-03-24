'use strict';

let publicPath = process.env.NODE_ENV == "development" ? "public/src" : "public/dist";

module.exports = {
    assets: {
        cms: {
            required: [
                'script-loader?!jquery',
                'jquery-mousewheel',
                'tether',
                'bootstrap',
                'script-loader?!magnific-popup',
                'bootstrap-daterangepicker',
                'flatpickr',
                'cropper',
                /////////////////
                'bootstrap/dist/css/bootstrap.css',
                'font-awesome/scss/font-awesome.scss',
                'magnific-popup/src/css/main.scss',
                'cropper/dist/cropper.css',
                'froala-editor/css/froala_editor.pkgd.min.css',
                'froala-editor/css/froala_style.min.css',
                'jsoneditor/dist/jsoneditor.min.css'
            ],
            css: [
                'cms/src/styles/vendor.css',
                'https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.1.20/jquery.fancybox.min.css',
                'https://cdnjs.cloudflare.com/ajax/libs/magnific-popup.js/1.1.0/magnific-popup.min.css',
                'cms/assets/startui/css/separate/pages/widgets.min.css',
                'cms/assets/startui/css/separate/main.css',
                'cms/src/styles/main.css',
            ],
            js: [
                'cms/src/scripts/vendor.js',
                'https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.0.3/socket.io.js',
                'https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.1.20/jquery.fancybox.min.js',
                'https://cdnjs.cloudflare.com/ajax/libs/magnific-popup.js/1.1.0/jquery.magnific-popup.min.js',
                'cms/src/scripts/main.js',
                'cms/src/scripts/common.js'
            ]
        },
        required: [
            'script-loader?!jquery',
            'jquery-mousewheel',
            'tether',
            'bootstrap',
            'bootstrap-daterangepicker',
            'flatpickr',
            // 'cropper',
            /////////////////
            // 'bootstrap/dist/css/bootstrap.css',
            // 'font-awesome/scss/font-awesome.scss',
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
                'public/vendor/font-awesome/css/font-awesome.min.css',
                // 'public/vendor/magnific-popup/magnific-popup.css',
                // 'https://cdnjs.cloudflare.com/ajax/libs/jScrollPane/2.2.1/style/jquery.jscrollpane.min.css',
                publicPath + '/styles/vendor.css',
                publicPath + '/styles/main.css',
                'https://fonts.googleapis.com/css?family=Nunito+Sans:700%7CNunito:300,600',
            ],
            js: [
                // 'public/vendor/jquery/jquery.min.js',
                // 'public/vendor/bootstrap/js/bootstrap.bundle.min.js',
                // 'public/vendor/jquery-easing/jquery.easing.min.js',
                // 'public/vendor/magnific-popup/jquery.magnific-popup.min.js',
                // 'https://cdnjs.cloudflare.com/ajax/libs/jScrollPane/2.2.1/script/jquery.jscrollpane.min.js',
                publicPath + '/scripts/vendor.js',
                publicPath + '/scripts/main.js',
            ]
        }
    }
}
