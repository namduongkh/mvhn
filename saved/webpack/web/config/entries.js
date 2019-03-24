const Glob = require('glob');
const PATHS = require('./path');

const configManager = require('kea-config');
configManager.setup('./app/config');

var vendor = configManager.get('web.assets.required');

let mainResource = Glob.sync(PATHS.assets + "/+(css|js)/+(*.js|*.css|*.scss)");
mainResource = mainResource.concat(Glob.sync(PATHS.modules + "/**/+(css|js)/+(*.js|*.scss)", {
    ignore: Glob.sync(PATHS.modules + "/cms/**/+(*.js|*.scss)")
}));

let cmsMain = Glob.sync(PATHS.modules + "/cms/views/skin/core/+(scripts|css|lib)/+(main.js|styles.scss)");
cmsMain = cmsMain.concat(Glob.sync(PATHS.modules + "/cms/views/skin/core/lib/+(*)/+(css|js)/+(*.js|*.css)"));
cmsMain = cmsMain.concat(Glob.sync(PATHS.modules + "/cms/views/skin/modules/+(**)/+(*.js|*.scss)"));

var cmsCommon = Glob.sync(PATHS.modules + "/cms/views/skin/core/vue/*.js");

let Entries = {};

if (vendor && vendor.length) {
    Entries.vendor = vendor;
}

if (cmsMain && cmsMain.length) {
    Entries.cmsMain = cmsMain;
}

if (cmsCommon && cmsCommon.length) {
    Entries.cmsCommon = cmsCommon;
}

if (mainResource && mainResource.length) {
    Entries.main = mainResource;
}

module.exports = Entries;