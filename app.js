'use strict';

const Hapi = require('hapi');

global.BASE_PATH = __dirname;

const serverInitial = async function () {
    const server = new Hapi.Server({
        port: 8000,
        host: 'localhost'
    });

    // Đăng ký các plugin khác
    await require("./app/bootstrap/bootstrap.js")(server);

    await server.start();
    return server;
}

serverInitial()
    .then(server => {
        console.log('Server running at:', server.info.uri);
    })
    .catch(error => {
        console.log(error);
    });