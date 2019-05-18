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

    const Model = mongoose.model(modelName);
    let attributes = Object.keys(Model.schema.obj);

    console.log('Model attributes: ');
    console.log(attributes.map(function(attr) {
      return `${attr} (${Model.schema.obj[attr].type && Model.schema.obj[attr].type.name})`
    }));
    let indexFields = await Util.inputRequest('Index attributes (seperate by `,`): ');

    try {
      fs.appendFileSync(`${Util.Path.text_searchs()}/text_searchs.js`, `
        new TextSearchModelCreator("${modelName}", ["_id", ${indexFields.split(",").map(function (attr) { return `"${attr}"` })}]).perform();
      `);
      console.error(`Generated text search model for ${modelName}`);
    } catch (error) {
      console.error(error);
    }
    rs();
  });
}
