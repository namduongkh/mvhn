'use strict';
const mongoose = require('mongoose');

exports.plugin = {
    register: function (server, options) {
        let config = server.configManager;

        mongoose.connect(config.get("web.db.uri"), {
            useMongoClient: true
        });
        mongoose.Promise = require('bluebird');
        require('mongoose-pagination');

        console.log('Register Mongo: ', config.get('web.db.uri'));
    },
    name: 'app-mongo'
}
