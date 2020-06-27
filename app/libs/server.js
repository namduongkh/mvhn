'use strict';

require('dotenv').config();
require('babel-core/register');
require('babel-polyfill');
global.Promise = require("bluebird");

import Hapi from 'hapi';
import KeaConfig from 'kea-config';
import Bootstrap from '../bootstrap/bootstrap';
import DynamicPathGenerator from "@root/app/libs/dynamic_path_generator";

export default class Server {
  constructor(BASE_PATH) {
    global.BASE_PATH = BASE_PATH;
    let config = KeaConfig.setup(BASE_PATH + '/app/config');
    console.log(BASE_PATH + '/app/config');
    this.server = new Hapi.Server(config.get('server'));
  }

  async init() {
    new DynamicPathGenerator(BASE_PATH).perform();
    await Bootstrap(this.server);
    await this.server.initialize();
    return this.server;
  }

  async start() {
    await this.server.start();
    console.log(`Server running at: ${this.server.info.uri}`);
    return this.server;
  }
}
