const _ = require('lodash');
const Glob = require('glob');
const PATHS = require('./path');

const configManager = require('kea-config');
configManager.setup('./app/config');

let templates = configManager.get('web.templates'); // All template
let mainTemplate = configManager.get('web.context.template'); // Main template
let Entries = [];

templates.forEach(name => {
  Entries = Entries.concat(getTemplateEntries(name));
});

global.CHUNK_NAMES = _.keys(_.fromPairs(Entries));

module.exports = _.fromPairs(Entries);

function getTemplateEntries(templateName) {
  let only = configManager.get(`web.assets['${templateName}'].only`);
  let except = configManager.get(`web.assets['${templateName}'].except`);
  let mainPattern = "+(*)";

  if (except) { mainPattern = `!(${except.join('|')})` }
  if (only) { mainPattern = `+(${only.join('|')})` }

  let vendor = configManager.get(`web.assets['${templateName}'].required`);
  let main = Glob.sync(PATHS.assets + "/" + templateName + "/+(css|js)/+(*.js|*.css|*.scss)");
  main = main.concat(Glob.sync(PATHS.module + "/" + mainPattern + "/views/+(css|js)/+(*.js|*.scss)"));

  let vendorName = templateName == mainTemplate ? 'vendor' : `${templateName}-vendor`;
  let mainName = templateName == mainTemplate ? 'main' : `${templateName}-main`;
  let result = [];

  if (vendor && vendor.length) {
    result.push([vendorName, vendor])
  }

  if (main && main.length) {
    result.push([mainName, main])
  }

  return result;
}
