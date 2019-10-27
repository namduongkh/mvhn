const defaultConfig = require('../general/default_config');

module.exports = {
  assets: {
    ...defaultConfig.assets,
    include: {
      css: [
        'public/vendor/bootstrap/css/bootstrap_v2.min.css',
        // 'public/vendor/fontawesome-free/css/all.min.css',
        // '//fonts.googleapis.com/css?family=Montserrat:400,700',
        // '//fonts.googleapis.com/css?family=Lato:400,700,400italic,700italic',
        'public/vendor/font-awesome/css/font-awesome.min.css',
        'cms/assets/css/all.min.css',
        // 'public/vendor/magnific-popup/magnific-popup.css',
        // '//cdnjs.cloudflare.com/ajax/libs/jScrollPane/2.2.1/style/jquery.jscrollpane.min.css',
        BUNDLE_PATH + '/styles/webmag-vendor.css',
        BUNDLE_PATH + '/styles/webmag-main.css',
        '//fonts.googleapis.com/css?family=Nunito+Sans:700%7CNunito:300,600',
      ],
      js: [
        // 'public/vendor/jquery/jquery.min.js',
        // 'public/vendor/jquery-easing/jquery.easing.min.js',
        // 'public/vendor/magnific-popup/jquery.magnific-popup.min.js',
        // '//cdnjs.cloudflare.com/ajax/libs/jScrollPane/2.2.1/script/jquery.jscrollpane.min.js',
        BUNDLE_PATH + '/commons.js',
        BUNDLE_PATH + '/scripts/webmag-vendor.js',
        // 'public/vendor/bootstrap/js/bootstrap.bundle.min.js',
        BUNDLE_PATH + '/scripts/webmag-main.js',
      ]
    }
  }
}
