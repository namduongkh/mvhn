'use strict';

require('babel-core/register');
require('babel-polyfill');

import Server from "./app/libs/server";

const server = new Server(process.env.BASE_PATH || __dirname);

server.init().then(() => server.start());
