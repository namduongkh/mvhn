'use strict'

const HapiAuthJwt2 = require('hapi-auth-jwt2');

exports.plugin = {
    register: async function (server, options, next) {
        var config = server.configManager;

        // bring your own validation function
        var validate = function (decoded, request, callback) {
            // console.log("Decode", decoded);
            // do your checks to see if the person is valid
            if (decoded && decoded.valid) {
                return callback(null, true);
            } else {
                return callback(null, false);
            }
        };

        await server.register(HapiAuthJwt2);

        server.auth.strategy('jwt', 'jwt', {
            key: config.get('web.jwt.secret'),
            validate: validate,
            verifyOptions: { ignoreExpiration: true, algorithms: ['HS256'] }
        });
    },
    name: 'app-auth-jwt2'
}
