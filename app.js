'use strict';

require('babel-core/register');
require('babel-polyfill');

const Hapi = require('hapi');

global.BASE_PATH = __dirname;

// Tạo server hapi
const server = new Hapi.Server();

// Module hapi-kea-config: 
// Cần tồn tại 3 file trong thư mục /app/config 
// main.conf.js, development.conf.js, production.conf.js
server.register({
    register: require('hapi-kea-config'),
    options: {
        confPath: BASE_PATH + '/app/config',
        decorateServer: true
    }
}, function () { });

var config = server.plugins['hapi-kea-config'];

var connections = config.get("web.connections")

// Thiết lập connection, chia port...
connections.forEach(function (config) {
    server.connection(config);
}, this);

// Đăng ký các plugin khác
require("./app/bootstrap/bootstrap.js")(server);

// Chạy server
server.start((err) => {
    if (err) {
        throw err;
    }
    server.connections.forEach(function (connectionSetting) {
        console.log("Server running:", connectionSetting.info.port);
    });
});

module.exports = server;