const Glob = require('glob');
const PATHS = require('./path');

const configManager = require('kea-config');
configManager.setup('./app/config');

const vendor = configManager.get('web.assets.required');

// let mainResource = Glob.sync(PATHS.module + "/core/+(scripts|css|lib)/+(main.js|styles.scss)");
let mainResource = Glob.sync(PATHS.template + "/+(css|js)/+(*.js|*.css|*.scss)");
// mainResource = mainResource.concat(Glob.sync(PATHS.module + "/core/lib/+(*)/+(css|js)/+(*.js|*.css)"));
mainResource = mainResource.concat(Glob.sync(PATHS.module + "/+(*)/views/+(css|js)/+(*.js|*.scss)"));

// let commonResource = [
//   ...Glob.sync(PATHS.module + "/core/vue/*.js"),
//   ...Glob.sync(PATHS.module + "/plugins/vue/*.js")
// ];

let Entries = {
  vendor: vendor,
  main: mainResource,
  // common: commonResource
};

module.exports = Entries;