const Glob = require('glob');
const PATHS = require('./path');

const configManager = require('kea-config');
configManager.setup('./app/config');

const vendor = configManager.get('web.assets.cms.required');

var mainResource = Glob.sync(PATHS.skin + "/core/+(scripts|css|lib)/+(main.js|styles.scss)");
mainResource = mainResource.concat(Glob.sync(PATHS.skin + "/core/lib/+(*)/+(css|js)/+(*.js|*.css)"));
mainResource = mainResource.concat(Glob.sync(PATHS.skin + "/plugins/+(**)/+(*.js|*.scss)"));

var commonResource = Glob.sync(PATHS.skin + "/core/vue/*.js");

let Entries = {
  vendor: vendor,
  main: mainResource,
  common: commonResource
};

module.exports = Entries;