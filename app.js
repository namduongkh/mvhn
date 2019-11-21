'use strict';

import Server from "./app/libs/server";

const server = new Server(__dirname);

server.init().then(() => server.start());
