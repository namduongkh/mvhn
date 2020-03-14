import mongoose from "mongoose";
import _ from "lodash";
import Util from "./util";
import Server from "../app/libs/server";

run().then((msg) => {
  if (msg) console.log(msg);
  process.exit();
});

async function run() {
  return new Promise(async (rs, rj) => {
    const server = await (new Server(BASE_PATH)).init();
    const SitemapConfig = mongoose.model('SitemapConfig');

    let configs = await SitemapConfig.find({ status: 1 });

    for (let i in configs) {
      console.log('Generating', configs[i].name);
      await configs[i].generateSitemap(server);
      console.log('Done', configs[i].name);
    }

    rs();
  });
}
