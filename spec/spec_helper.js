const Path = require("path");
const BASE_PATH = Path.resolve(__dirname, '../');
const Server = require(BASE_PATH + '/app/libs/server').default;

let server;

exports.handleServer = (beforeEach, afterEach) => {
  beforeEach(async () => {
    server = await Server.getInstance(BASE_PATH);
  });

  afterEach(async () => {
    await server.stop();
  });
}

exports.getServer = () => server;
