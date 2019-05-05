const configManager = require('kea-config');

const ROOT_PATH = process.cwd();
configManager.setup('./app/config');

const PATHS = {
    src: ROOT_PATH + '/public/src',
    dist: ROOT_PATH + '/public/dist',
    module: ROOT_PATH + '/app/plugins',
    template: ROOT_PATH + '/public/assets/' + configManager.get('web.template'),
};

module.exports = PATHS;