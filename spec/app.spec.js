'use strict';

require('babel-core/register');
require('babel-polyfill');

const Lab = require('@hapi/lab');
const { expect } = require('@hapi/code');
const { afterEach, beforeEach, describe, it } = exports.lab = Lab.script();
const { getServer, handleServer } = require("./spec_helper");

describe('Default routes', () => {
  handleServer(beforeEach, afterEach);

  it('GET /', async () => {
    const res = await getServer().inject({
      method: 'get',
      url: '/'
    });
    expect(res.statusCode).to.equal(200);
  });

  it('GET /cms', async () => {
    const res = await getServer().inject({
      method: 'get',
      url: '/cms'
    });
    expect(res.statusCode).to.equal(302);
  });
});
