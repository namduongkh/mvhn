const configManager = require('kea-config');

const ROOT_PATH = process.cwd();
configManager.setup('./app/config');

const PATHS = {
    src: ROOT_PATH + '/public/src',
    dist: ROOT_PATH + '/public/dist',
    plugin: ROOT_PATH + '/app/plugins',
    cmsModule: ROOT_PATH + '/app/plugins/cms/views',
    template: ROOT_PATH + '/public/assets/' + configManager.get('web.context.template'),
    assets: ROOT_PATH + '/public/assets',
    app: ROOT_PATH + '/app',
};

module.exports = PATHS;
