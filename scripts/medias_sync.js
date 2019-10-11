import mongoose from "mongoose";
import fs from "fs";
import _ from "lodash";
import Path from "path";
import Util from "./util";

run().then((msg) => {
  if (msg) console.log(msg);
  process.exit();
});

async function run() {
  return new Promise(async (rs, rj) => {
    Util.connectMongoDB();

    const Media = mongoose.model('Media');

    let files = Util.listFilesInDirectory(Path.resolve(BASE_PATH, 'public', 'files'), Path.resolve(BASE_PATH, 'public'))

    for (let i in files) {
      try {
        let file = files[i].replace(/^[\/\\]/, '');
        let check = await Media.count({ path: file }).lean();
        if (!check) {
          let media = new Media({
            name: file,
            path: file,
            ext: file.split('.').pop()
          });
          await media.save();
          console.log(`Added '${file}' to Media`);
        }
      } catch (error) {
        console.log(`Error when add '${file}' to Media`);
      }
    }

    rs();
  });
}
