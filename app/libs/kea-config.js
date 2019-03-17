'use strict';

const configManager = require('kea-config');

exports.plugin = {
  name: 'hapi-kea-config',
  register: function (server, options) {
    if (options && options.confPath) {
      configManager.setup(options.confPath);
    }
    server.expose(configManager);

    if (options && options.decorateServer) {
      server.decorate('server', 'configManager', server.plugins['hapi-kea-config']);
    }
  }
};