'use strict'
const bluebird = require('bluebird');
const redis = require('redis');
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

exports.plugin = {
    register: function (server, options) {
        var configManager = server.configManager;

        var settings = configManager.get('web.redisOptions');

        if (!settings.url) {
            return console.log(`Redis url not config`);
        }

        let client = redis.createClient(settings);

        client.on("error", function (err) {
            console.log("REDIS Error " + err);
        });

        server.events.on('stop', function () { // only one server.on('stop') listener
            console.log("REDIS Stop ");
            client.end(true);
            client.quit();
        });

        client.on("ready", function () {
            console.log("REDIS READY ");
        });

        client.on("connect", function () {
            console.log("REDIS Connect ");
        });

        server.decorate('server', 'redis', client);
        server.decorate('request', 'redis', client);
        server.expose('client', client);
        console.log('Register Redis');
    },
    name: 'app-redis',
    dependencies: 'app-mongo'
}
