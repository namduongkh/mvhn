'use strict';
import mongoose from 'mongoose';
import Glob from 'glob';
import Path from 'path';

exports.plugin = {
    register: function (server, options) {
        let config = server.configManager;

        connectMongoDB(config.get("web.db.uri"));

        mongoose.Promise = require('bluebird');
        require('mongoose-pagination');
    },
    name: 'app-mongo'
}

exports.connectMongoDB = connectMongoDB;

function connectMongoDB(url, options = { useMongoClient: true }) {
    mongoose.connect(url, options);

    console.log('Connected MongoDB: ', url);

    let models = Glob.sync(BASE_PATH + "/app/modules/*/models/*.js", {});
    models.forEach((item) => {
        require(Path.resolve(item));
        console.log("Load model:", item);
    });
}