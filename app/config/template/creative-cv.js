const defaultConfig = require('../general/default_config');

let publicPath = process.env.NODE_ENV == "development" ? "public/src" : "public/dist";

module.exports = {
  assets: {
    ...defaultConfig.assets,
    include: {
      css: [
        "https://fonts.googleapis.com/css?family=Montserrat:400,700,200",
        "public/assets/creative-cv/css/aos.css",
        "public/assets/creative-cv/css/bootstrap.min.css",
        "public/assets/creative-cv/styles/main.css",
        'public/vendor/font-awesome/css/font-awesome.min.css',
        'cms/assets/css/all.min.css',
        publicPath + '/styles/vendor.css',
        publicPath + '/styles/main.css',
      ],
      js: [
        publicPath + '/scripts/vendor.js',
        "public/assets/creative-cv/js/core/jquery.3.2.1.min.js",
        "public/assets/creative-cv/js/core/popper.min.js",
        "public/assets/creative-cv/js/core/bootstrap.min.js",
        "public/assets/creative-cv/js/now-ui-kit.js?v=1.1.0",
        "public/assets/creative-cv/js/aos.js",
        "public/assets/creative-cv/scripts/main.js",
        publicPath + '/scripts/main.js',
      ]
    }
  }
}
