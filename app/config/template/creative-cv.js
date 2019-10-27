const defaultConfig = require('../general/default_config');

module.exports = {
  assets: {
    except: ['event'],
    ...defaultConfig.assets,
    include: {
      css: [
        "https://fonts.googleapis.com/css?family=Montserrat:400,700,200",
        "public/assets/creative-cv/styles/aos.css",
        "public/assets/creative-cv/styles/bootstrap.min.css",
        'public/vendor/font-awesome/css/font-awesome.min.css',
        'cms/assets/css/all.min.css',
        BUNDLE_PATH + '/styles/creative-cv-vendor.css',
        BUNDLE_PATH + '/styles/creative-cv-main.css',
      ],
      js: [
        BUNDLE_PATH + '/commons.js',
        BUNDLE_PATH + '/scripts/creative-cv-vendor.js',
        "public/assets/creative-cv/scripts/core/jquery.3.2.1.min.js",
        "public/assets/creative-cv/scripts/core/popper.min.js",
        "public/assets/creative-cv/scripts/core/bootstrap.min.js",
        "public/assets/creative-cv/scripts/now-ui-kit.js?v=1.1.0",
        "public/assets/creative-cv/scripts/aos.js",
        BUNDLE_PATH + '/scripts/creative-cv-main.js',
      ]
    }
  }
}
