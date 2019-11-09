'use strict';

require('dotenv').config();

import Hapi from 'hapi';
import KeaConfig from 'kea-config';

global.BASE_PATH = __dirname;

const serverInitial = async function () {
    let config = KeaConfig.setup(BASE_PATH + '/app/config');
    const server = new Hapi.Server(config.get('server'));

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
