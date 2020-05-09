import Path from "path";
import KeaConfig from "kea-config";
import readline from "readline";
import ejs from "ejs";
import fsExtra from "fs-extra";
import fs from "fs";
import archiver from "archiver";
import rimraf from "rimraf";
import _ from "lodash";
import { exec } from 'shelljs';

global.BASE_PATH = process.cwd().replace(/(\/|\\)scripts$/, '');

require("./generate_paths");

const config = KeaConfig.setup(BASE_PATH + '/app/config');
const { connectMongoDB, connectUrl } = require('@root/app/libs/mongo.js');

const Util = {
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
      let _path = BASE_PATH + '/public/files/backup_db';
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
  },

  listFilesInDirectory(path, relativePath = '') {
    let items = fs.readdirSync(path);
    let result = [];

    for (let i in items) {
      let item = items[i];
      let itemPath = Path.resolve(path, item);

      if (Util.isDirectory(itemPath)) {
        let subDirectoryFiles = Util.listFilesInDirectory(itemPath, relativePath);
        if (subDirectoryFiles.length) {
          result = result.concat(subDirectoryFiles);
        }
      } else {
        result.push(itemPath.replace(relativePath, ''));
      }
    }

    return result;
  },

  isDirectory(path) {
    return fs.lstatSync(path).isDirectory();
  },

  zipFolder(folderPath, options = {
    removeAfterZip: true
  }) {
    return new Promise((rs, rj) => {
      if (!fs.existsSync(folderPath)) return;

      let output = fs.createWriteStream(`${folderPath}.zip`);
      let archive = archiver('zip');

      output.on('close', function () {
        console.log(archive.pointer() + ' total bytes');
        console.log('archiver has been finalized and the output file descriptor has closed.');
        if (options.removeAfterZip) {
          rimraf.sync(`${folderPath}`);
        }
        rs();
      });

      archive.on('error', function (err) {
        rj(err);
      });

      archive.pipe(output);
      archive.directory(`${folderPath}`, folderPath.split('/').pop());
      archive.finalize();
    });
  }
}

export default Util;
