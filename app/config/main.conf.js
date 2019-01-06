'use strict';
const Pack = require(global.BASE_PATH + '/package');
const frontend = require('./general/frontend.js');
const backend = require('./general/backend.js');

module.exports = {
    web: {
        name: Pack.name,
        db: {
            uri: 'mongodb://localhost/db_makeup',
            options: {
                user: '',
                pass: ''
            }
        },
        cookieOptions: {
            ttl: 365 * 24 * 60 * 60 * 1000, // expires a year from today
            encoding: 'none', // we already used JWT to encode
            path: '/',
            isSecure: false, // warm & fuzzy feelings
            isHttpOnly: true, // prevent client alteration
            clearInvalid: true, // remove invalid cookies
            strictHeader: true // don't allow violations of RFC 6265
        },
        jwt: {
            secret: 'L7FWdNnQU7cfmQ87WuucQFK3YZvNBuvc'
        },
        connections: [{
                port: process.env.WEB_PORT || 5005,
                labels: ['api', 'web'],
                routes: {
                    cors: {
                        origin: ['*'],
                        credentials: true
                    }
                },
                router: {
                    stripTrailingSlash: false
                }
            },
            // {
            //     port: process.env.API_PORT || 5006,
            //     labels: 'api',
            //     routes: {
            //         cors: {
            //             origin: ['*'],
            //             credentials: true
            //         }
            //     }
            // },
        ],
        htmlCompress: true,
        context: {
            error: {
                user: {
                    login: "/dang-nhap"
                },
            },
            meta: {
                title: "Portfolio",
                description: "Portfolio",
                image: '/assets/img/share-image.jpg'
            },
        },
        assets: frontend.assets,
        assetVersion: Date.now()
    }
};