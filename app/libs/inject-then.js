'use strict'

var bluebird = require('bluebird')
var assert = require('assert')

exports.plugin = {
  name: 'inject-then',
  register: function (server, options) {
    var Promise = options.Promise || bluebird
    assert(!options.replace, 'options.replace was removed')
    function injectThen(options) {
      var self = this
      return new Promise(function (resolve) {
        self.inject(options, resolve)
      })
    }
    if (!server.injectThen) server.decorate('server', 'injectThen', injectThen)
  }
};
