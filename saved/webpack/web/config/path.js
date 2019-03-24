const configManager = require('kea-config');
configManager.setup('./app/config');

const PATHS = {
    assets: global.BASE_PATH + '/public/assets/' + (configManager.get('web.template') || 'default'),
    vendor: global.BASE_PATH + '/public/vendor',
    src: global.BASE_PATH + '/public/src',
    dist: global.BASE_PATH + '/public/dist',
    modules: global.BASE_PATH + '/app/modules',
};

module.exports = PATHS;