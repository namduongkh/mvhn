import Path from "path";
import KeaConfig from "kea-config";
import readline from "readline";
import ejs from "ejs";
import fsExtra from "fs.extra";
import fs from "fs";

global.BASE_PATH = Path.resolve('../');

const config = KeaConfig.setup(BASE_PATH + '/app/config');
const { connectMongoDB } = require(BASE_PATH + '/app/libs/mongo.js');

export default {
  Config: config,

  Path: {
    migrations: function () {
      let _path = '../app/db/migrations';
      if (!fs.existsSync(_path)) {
        fsExtra.mkdirpSync(_path);
      }
      return _path;
    }
  },

  inputRequest: function (question = '') {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    return new Promise((rs, rj) => {
      rl.question(question, (answer) => {
        rs(answer);
        rl.close();
      });
    });
  },

  renderTemplate: function (path, data) {
    return new Promise((rs, rj) => {
      ejs.renderFile(path, data, function (err, str) {
        if (err) {
          return rj(err);
        }
        rs(str);
      })
    });
  },

  connectMongoDB: function () {
    let config = KeaConfig.setup(BASE_PATH + '/app/config');
    connectMongoDB(config.get("web.db.uri"));
  }
}