'use strict';
import mongoose from 'mongoose';
import Glob from 'glob';

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

  loadModels();
}

function connectUrl(dbConfig) {
  let { protocol, host, name, user, password } = dbConfig;
  if (!protocol) protocol = 'mongodb://';

  let uri = `${protocol}`;

  if (user && password) uri += `${user}:${password}@`;
  if (host) uri += host;
  if (name) uri += '/' + name;

  return uri;
}

function loadModels() {
  let basePath = BASE_PATH.replace(new RegExp(/\\/, 'gi'), '/');
  let models = Glob.sync(BASE_PATH + "/app/plugins/*/models/*.js", {});
  models.forEach((item) => {
    let pluginName = item.replace(new RegExp(basePath + "/app/plugins/(.+)/models/(.+)"), '$1');
    let modelName = item.replace(new RegExp(basePath + "/app/plugins/(.+)/models/(.+)"), '$2');

    if (process.env.NODE_ENV !== 'development') return require(item);
    require(`@plugins/${pluginName}/models/${modelName}`);
  });

  let textSearchModels = Glob.sync(BASE_PATH + "/app/db/text_searchs/*.js", {});
  textSearchModels.forEach((item) => {
    let modelName = item.replace(new RegExp(basePath + "/app/db/text_searchs/(.+)"), '$1');

    if (process.env.NODE_ENV !== 'development') return require(item);
    require(`@root/app/db/text_searchs/${modelName}`);
  });
}
