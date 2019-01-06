'use strict';
import PouchDB from 'pouchdb';

exports.register = function (server, options, next) {
    var DB = new PouchDB(__dirname + '/pouchdb/db_portfolio');
    server.expose('DB', DB);
    console.log('Register PouchDB');
    next();

};

exports.register.attributes = {
    name: 'app-pouchdb'
};