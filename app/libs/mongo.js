'use strict';
const mongoose = require('mongoose');

exports.register = function(server, options, next) {

    let config = server.configManager;

    mongoose.connect(config.get("web.db.uri"));
    mongoose.Promise = require('bluebird');
    require('mongoose-pagination');
    console.log('Register Mongo');
    next();

};

exports.register.attributes = {
    name: 'app-mongo'
};