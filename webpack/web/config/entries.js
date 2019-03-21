const Glob = require('glob');
const PATHS = require('./path');

const configManager = require('kea-config');
configManager.setup('./app/config');
var vendor = configManager.get('web.assets.required');
let mainResource = Glob.sync(PATHS.assets + "/+(css|js)/+(*.js|*.css|*.scss)");
mainResource = mainResource.concat(Glob.sync(PATHS.modules + "/**/+(css|js)/+(*.js|*.scss)", {
    ignore: Glob.sync(PATHS.modules + "/cms/**/+(*.js|*.scss)")
}));

let cmsResource = Glob.sync(PATHS.modules + "/cms/views/js/core/+(scripts|css|lib)/+(main.js|styles.scss)");
cmsResource = cmsResource.concat(Glob.sync(PATHS.modules + "/cms/views/js/core/lib/+(*)/+(css|js)/+(*.js|*.css)"));
cmsResource = cmsResource.concat(Glob.sync(PATHS.modules + "/cms/views/js/modules/+(**)/+(*.js|*.scss)"));

let Entries = {};

if (vendor && vendor.length) {
    Entries.vendor = vendor;
}

if (cmsResource && cmsResource.length) {
    Entries.cms = cmsResource;
}

if (mainResource && mainResource.length) {
    Entries.main = mainResource;
}

module.exports = Entries;