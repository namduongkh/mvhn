'use strict';
import mongoose from 'mongoose';
import Glob from 'glob';
import Path from 'path';

mongoose.plugin(require('mongoose-lean-virtuals')); // .lean({ virtuals: true })

exports.plugin = {
  register: async function (server, options) {
    let config = server.configManager;

    connectMongoDB(config.get("web.db"));

    mongoose.Promise = require('bluebird');
    require('mongoose-pagination');
  },
  name: 'app-mongo'
}

exports.connectMongoDB = connectMongoDB;
exports.connectUrl = connectUrl;

function connectMongoDB(dbConfig, options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}) {
  if (!dbConfig) throw "Please provide the MongoDB Config.";
  let url = connectUrl(dbConfig);

  mongoose.connect(url, options).then(() => {
    console.log('Connected MongoDB: ', url);
  });

  mongoose.set('useNewUrlParser', true);
  mongoose.set('useFindAndModify', false);
  mongoose.set('useCreateIndex', true);
  mongoose.set('useUnifiedTopology', true);

  let models = Glob.sync(BASE_PATH + "/app/plugins/*/models/*.js", {});
  models.forEach((item) => {
    require(Path.resolve(item));
  });

  let textSearchModels = Glob.sync(BASE_PATH + "/app/db/text_searchs/*.js", {});
  textSearchModels.forEach((item) => {
    require(Path.resolve(item));
  });
}

function connectUrl(dbConfig) {
  let { host, name, user, password } = dbConfig;
  let uri = 'mongodb://';
  if (user && password) uri += `${user}:${password}@`;
  if (host) uri += host;
  if (name) uri += '/' + name;

  return uri;
}
