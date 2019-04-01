'use strict'

const AuthJwt2 = require('hapi-auth-jwt2');

exports.plugin = {
    register: async function (server, options) {
        var config = server.configManager;

        function _decode(decoded) {
            return new Promise((rs, rj) => {
                const redisClient = server.redis;

                redisClient.get(decoded.id, function (rediserror, result) {
                    if (rediserror) {
                        server.log(['error', 'redis', 'validateauth'], rediserror);
                    }
                    let session;
                    if (result) {
                        session = JSON.parse(result);
                        // console.log(session);
                    } else {
                        // return callback(rediserror, false);
                        rs({ isValid: false });
                    }
                    if (session.valid === true) {
                        // return callback(rediserror, true);
                        rs({ isValid: true });
                    } else {
                        // return callback(rediserror, false);
                        rs({ isValid: false });
                    }
                });
            });
        }

        const validate = async function (decoded, request) {
            return await _decode(decoded);
        }

        await server.register(AuthJwt2);

        server.auth.strategy('jwt', 'jwt', {
            key: config.get('web.jwt.secret'),
            validate: validate,
            verifyOptions: { ignoreExpiration: true, algorithms: ['HS256'] },
            cookieKey: COOKIE_NAME,
            urlKey: COOKIE_NAME,
            headerKey: COOKIE_NAME
        });

        // server.auth.default('jwt');

        // server.auth.strategy('jwt-admin', 'jwt', {
        //     key: config.get('web.jwt.secret'),
        //     validateFunc: validate,
        //     verifyOptions: { ignoreExpiration: true, algorithms: ['HS256'] },
        //     cookieKey: COOKIE_NAME,
        //     urlKey: COOKIE_NAME,
        //     headerKey: COOKIE_NAME
        // });
    },
    name: 'app-auth-jwt2',
    dependencies: ['app-redis']
};
