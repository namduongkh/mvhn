'use strict';

require('dotenv').config();
global.Promise = require("bluebird");

import Hapi from 'hapi';
import KeaConfig from 'kea-config';
import Bootstrap from '../bootstrap/bootstrap';

export default class Server {

  static async getInstance(BASE_PATH) {
    if (!this.instance) {
      this.instance = await (new this(BASE_PATH)).init();
    }

    return this.instance;
  }

  constructor(BASE_PATH) {
    global.BASE_PATH = BASE_PATH;
    let config = KeaConfig.setup(BASE_PATH + '/app/config');
    this.server = new Hapi.Server(config.get('server'));
  }

  async init() {
    console.log('Server initing...')
    console.time('Server init time');
    await Bootstrap(this.server);
    await this.server.initialize();
    console.timeEnd('Server init time');
    return this.server;
  }

  async start() {
    await this.server.start();
    console.log(`Server running at: ${this.server.info.uri}`);
    return this.server;
  }
}
