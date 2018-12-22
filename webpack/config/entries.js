const Glob = require('glob');
const PATHS = require('./path');

const configManager = require('kea-config');
configManager.setup('./app/config');
const vendor = configManager.get('web.assets.required');
let mainResource = Glob.sync(PATHS.assets + "/+(css|js)/+(*.js|*.css|*.scss)");
mainResource = mainResource.concat(Glob.sync(PATHS.modules + "/+(css|js)/+(*.js|*.scss)"));

let Entries = {};

if (vendor) {
    Entries.vendor = vendor;
}

if (mainResource) {
    Entries.main = mainResource;
}

module.exports = Entries;