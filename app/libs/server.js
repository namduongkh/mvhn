'use strict';

require('dotenv').config();

import Hapi from 'hapi';
import KeaConfig from 'kea-config';

export default class Server {
  constructor(BASE_PATH) {
    global.BASE_PATH = BASE_PATH;
    let config = KeaConfig.setup(BASE_PATH + '/app/config');
    console.log(BASE_PATH + '/app/config');
    this.server = new Hapi.Server(config.get('server'));
  }

  async init() {
    await require(BASE_PATH + '/app/bootstrap/bootstrap.js')(this.server);
    await this.server.initialize();
    return this.server;
  }

  async start() {
    await this.server.start();
    console.log(`Server running at: ${this.server.info.uri}`);
    return this.server;
  };
}
