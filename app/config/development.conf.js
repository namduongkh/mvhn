'use strict';

module.exports = {
    web: {
        settings: {
            services: {
                apiUrl: 'http://localhost:5006',
                webUrl: 'http://localhost:5005',
            },
        },
        assets: {
            js: [
                '/libs/jquery/dist/jquery.min.js',
                '/libs/jquery-migrate/jquery-migrate.min.js',
                '/libs/angular/angular.min.js',
                '/libs/bootstrap/dist/js/bootstrap.min.js',
                '/libs/angular-cookies/angular-cookies.min.js',
                '/libs/angular-animate/angular-animate.min.js',
                '/libs/angular-toastr/dist/angular-toastr.tpls.min.js',
                '/libs/angular-loading-bar/build/loading-bar.min.js',
                '/libs/angular-ui-router/release/angular-ui-router.min.js',
                '/libs/tinymce/tinymce.min.js',
                '/libs/angular-ui-tinymce/src/tinymce.js',
                '/libs/slug/slug.js',
                '/libs/magnific-popup/dist/jquery.magnific-popup.min.js',
                '/libs/slick-carousel/slick/slick.min.js',

                '/assets/js/app.js',
                '/assets/js/config.js',
                // '/assets/min/app.min.js',
            ],
            css: [
                '/libs/bootstrap/dist/css/bootstrap.min.css',
                '/libs/bootstrap/dist/css/bootstrap-theme.min.css',
                '/libs/font-awesome/css/font-awesome.min.css',
                '/libs/angular-loading-bar/build/loading-bar.min.css',
                '/libs/angular-toastr/dist/angular-toastr.min.css',
                '/libs/magnific-popup/dist/magnific-popup.css',
                '/libs/slick-carousel/slick/slick.min.js',
                '/libs/slick-carousel/slick/slick-theme.css',

                '/assets/css/styles.css',
                // '/assets/min/app.min.css',
            ]
        }
    }
};