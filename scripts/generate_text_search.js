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

    let modelName = (process.argv[2] || await Util.inputRequest('Model name: '));
    if (!modelName || !mongoose.models[modelName]) return rs(`Model ${modelName} doesn't exists!`);

    try {
      let data = {
        modelName
      }
      let filename = `${modelName.toLowerCase()}_text_search.js`;

      fs.writeFileSync(`${Util.Path.text_searchs()}/${filename}`, await Util.renderTemplate('./templates/text_search.model.js', data));
      console.error(`Generated text search model ${filename}`);
    } catch (error) {
      console.error(error);
    }
    rs();
  });
}