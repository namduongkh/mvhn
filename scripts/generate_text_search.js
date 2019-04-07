import Glob from "glob";
import moment from "moment";
import mongoose from "mongoose";
import fs from "fs";
import _ from "lodash";
import Util from "./util";

run().then((msg) => {
  if (msg) console.log(msg);
  process.exit();
});

function run() {
  return new Promise(async (rs, rj) => {
    Util.connectMongoDB();

    let modelName = process.argv[2] || await Util.inputRequest('Model name: ');
    if (!modelName || !mongoose.models[modelName]) return rs(`Model ${modelName} doesn't exists!`);

    const Model = mongoose.model(modelName);
    console.log(111, Model);

    // let name = await Util.inputRequest('Migration name: ');
    // if (!name) return rs('-- Please provide the name.');

    // name = name.replace(/\s/gi, '_');

    // let checkFiles = Glob.sync(`${Util.Path.migrations()}/*${name}.js`);
    // if (checkFiles.length) {
    //   console.error('Migration name has exists!', checkFiles[0]);
    //   rs();
    // } else {
    //   try {
    //     let version = moment().format('YYYYMMDDhhmmss');
    //     let filename = `${version}_${name}.js`;
    //     let data = {
    //       classname: name.split('_').map((string) => { return _.capitalize(string.replace(/_|\s/gi, '')) }).join('')
    //     }

    //     fs.writeFileSync(`${Util.Path.migrations()}/${filename}`, await Util.renderTemplate('./templates/migration.ejs', data));
    //     console.error(`Generated migration ${filename}`);
    //   } catch (error) {
    //     console.error(error);
    //   }
    //   rs();
    // }
  })
}
