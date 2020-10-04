'use strict';

import Server from "./app/libs/server";
import ScriptUtil from "./scripts/util";

const server = new Server(process.env.BASE_PATH || __dirname);

ScriptUtil.connectMongoDB();
server.init().then(() => server.start());
