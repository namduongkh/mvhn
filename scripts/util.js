import Path from "path";
import KeaConfig from "kea-config";
import readline from "readline";
import ejs from "ejs";
import fsExtra from "fs-extra";
import fs from "fs";
import _ from "lodash";
import { exec } from 'shelljs';

global.BASE_PATH = process.cwd().replace(/(\/|\\)scripts$/, '');

const config = KeaConfig.setup(BASE_PATH + '/app/config');
const { connectMongoDB, connectUrl } = require(BASE_PATH + '/app/libs/mongo.js');

export default {
  Config: config,

  Path: {
    migrations: function () {
      let _path = BASE_PATH + '/app/db/migrations';
      if (!fs.existsSync(_path)) {
        fsExtra.mkdirpSync(_path);
      }
      return _path;
    },
    text_searchs: function () {
      let _path = BASE_PATH + '/app/db/text_searchs';
      if (!fs.existsSync(_path)) {
        fsExtra.mkdirpSync(_path);
      }
      return _path;
    },
    storages: function () {
      let _path = BASE_PATH + '/app/db/storages';
      if (!fs.existsSync(_path)) {
        fsExtra.mkdirpSync(_path);
      }
      return _path;
    },
    plugin: function (name) {
      let _path = BASE_PATH + '/app/plugins/' + name;
      return _path;
    }
  },

  inputRequest: function (question = '', defaultValue = '') {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.write(defaultValue);

    return new Promise((rs, rj) => {
      rl.question(question, (answer) => {
        rs(answer);
        rl.close();
      });
    });
  },

  renderTemplate: function (path, data) {
    return new Promise((rs, rj) => {
      ejs.renderFile(Path.resolve(BASE_PATH, 'scripts', path), data, function (err, str) {
        if (err) {
          return rj(err);
        }
        rs(str);
      })
    });
  },

  connectMongoDB: function () {
    let config = KeaConfig.setup(BASE_PATH + '/app/config');
    connectMongoDB(config.get("web.db"));
  },

  removeLodashAndCapitalize(text, joinString = '') {
    return text.split('_').map(word => {
      return _.capitalize(word);
    }).join(joinString);
  },

  execCommands(commands = []) {
    for (let i in commands) {
      let command = commands[i];
      exec(command);
    }
  }
}