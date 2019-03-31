// let htmlModulePath = '/app/templates/admin';
const ROOT_PATH = process.cwd();
const PATHS = {
    // htmlModulePath: htmlModulePath,
    src: ROOT_PATH + '/public/cms/src',
    dist: ROOT_PATH + '/public/cms/dist',
    // build: ROOT_PATH + '/public/admin/assets/build',
    module: ROOT_PATH + '/app/modules/cms/views',
    skin: ROOT_PATH + '/app/modules/cms/views/skin',
    plugin: ROOT_PATH + '/app/modules'
};

module.exports = PATHS;