'use strict'

const AuthJwt2 = require('hapi-auth-jwt2');

// const Pack = require(global.BASE_PATH + '/package');

exports.register = function(server, options, next) {
    var config = server.configManager;

    // bring your own validation function
    var validate = function(decoded, request, callback) {
        // console.log("Decode", decoded);
        // do your checks to see if the person is valid
        if (decoded && decoded.valid) {
            return callback(null, true);
        } else {
            return callback(null, false);
        }
    };


    function registerJwtAuth2(err) {
        if (err) {
            server.log(err);
        }
        server.auth.strategy('jwt', 'jwt', 'try', {
            key: config.get('web.jwt.secret'),
            validateFunc: validate,
            verifyOptions: { ignoreExpiration: true, algorithms: ['HS256'] }
        });

        return next();
    }

    server.register(AuthJwt2, registerJwtAuth2);
};

exports.register.attributes = {
    name: 'app-auth-jwt2',
    // dependencies: ['app-redis']
};