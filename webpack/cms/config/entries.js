const Glob = require('glob');
const PATHS = require('./path');

const configManager = require('kea-config');
configManager.setup('./app/config');

const vendor = configManager.get(`web.assets['${configManager.get('web.context.template')}'].cms.required`);

var mainResource = Glob.sync(PATHS.skin + "/core/+(scripts|css)/+(main.js|styles.scss)");
mainResource = mainResource.concat(Glob.sync(PATHS.skin + "/core/lib/+(*)/+(css|js)/+(*.js|*.css)"));
mainResource = mainResource.concat(Glob.sync(PATHS.skin + "/plugins/+(**)/+(*.js|*.scss)"));
mainResource = mainResource.concat(Glob.sync(PATHS.skin + "/core/vue/*.js"));

let Entries = {
  vendor: vendor,
  main: {
    import: mainResource,
    dependOn: 'vendor'
  }
};

module.exports = Entries;
