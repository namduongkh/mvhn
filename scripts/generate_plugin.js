import Glob from "glob";
import moment from "moment";
import mongoose from "mongoose";
import fs from "fs";
import fsExtra from "fs-extra";
import _ from "lodash";
import Util from "./util";

run().then((msg) => {
  if (msg) console.log(msg);
  process.exit();
});

function run() {
  return new Promise(async (rs, rj) => {
    let folderName = process.argv[2] || await Util.inputRequest('Plugin name: ');
    if (!folderName) return rs('-- Please provide the plugin name.');

    let folderPath = Util.Path.plugin(folderName);
    if (fs.existsSync(folderPath)) {
      return rs('The plugin has existed, please try with another name.');
    }

    let collectionName = (folderName + 's').replace('ys', 'ies');
    let data = {
      pluginName: folderName,
      modelName: Util.removeLodashAndCapitalize(folderName),
      collectionName: collectionName,
      controllerName: Util.removeLodashAndCapitalize(collectionName)
    }

    fs.mkdirSync(folderPath);
    fs.mkdirSync(folderPath + '/controllers');
    fs.mkdirSync(folderPath + '/models');
    fs.mkdirSync(folderPath + '/views');
    fs.mkdirSync(folderPath + '/views/cms');

    fs.writeFileSync(`${folderPath + '/index.js'}`, await Util.renderTemplate('./templates/plugin/index.js', data));
    fs.writeFileSync(`${folderPath + '/controllers/' + data.collectionName + '.controller.js'}`, await Util.renderTemplate('./templates/plugin/controllers/controller.js', data));
    fs.writeFileSync(`${folderPath + '/models/' + data.pluginName + '.js'}`, await Util.renderTemplate('./templates/plugin/models/model.js', data));
    fs.writeFileSync(`${folderPath + '/views/index.html'}`, await Util.renderTemplate('./templates/plugin/views/index.html', data));

    console.log('Done! Init the model and try: `npm run scripts generate_cms_plugin`');
    rs();
  });
}
