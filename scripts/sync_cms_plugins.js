import Glob from "glob";
import fs from "fs";
import Util from "./util";

run().then((msg) => {
  if (msg) console.log(msg);
  process.exit();
});

function run() {
  return new Promise(async (rs, rj) => {
    initCmsPlugins();
    console.log('Synced!');
  })
}

function initCmsPlugins() {
  const plugins = Glob.sync(BASE_PATH + '/app/plugins/*/views/cms/index.js');
  let importContent = '';
  let exportContent = '';
  plugins.forEach((plugin) => {
    let pluginName = plugin.match(/\/app\/plugins\/([^\/]+)\/views\/cms\/index.js/)[1];
    importContent += `import ${pluginName} from "@app/${plugin.replace(/.+\/app\/(.+)/gi, '$1')}";\n`;
    exportContent += `\t${pluginName},\n`;
    console.log('Added: ', pluginName);
  });
  exportContent = `export default [\n${exportContent}]`;
  fs.writeFileSync(BASE_PATH + '/app/plugins/cms/views/skin/routers/index.js', `${importContent}\n${exportContent}`);
}
