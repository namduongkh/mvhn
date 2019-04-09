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

async function run() {
  return new Promise(async (rs, rj) => {
    Util.connectMongoDB();

    let modelName = (process.argv[2] || await Util.inputRequest('Model name: '));
    if (!modelName || !mongoose.models[modelName]) return rs(`Model ${modelName} doesn't exists!`);

    let modelTextSearch = modelName + 'TextSearch';
    if (!mongoose.models[modelTextSearch]) return rs(`Model ${modelName} doesn't exists!`);

    const TextSearchModel = mongoose.model(modelTextSearch);

    await TextSearchModel.reindex();
    await TextSearchModel.removeNotExist();

    rs();
  });
}
