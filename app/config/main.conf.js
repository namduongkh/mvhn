'use strict';

module.exports = {
    web: {
        db: {
            uri: 'mongodb://localhost/db_hapi',
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
                labels: 'web',
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
            {
                port: process.env.API_PORT || 5006,
                labels: 'api',
                routes: {
                    cors: {
                        origin: ['*'],
                        credentials: true
                    }
                }
            },
        ],
        error: {
            user: {
                login: "/dang-nhap"
            },
        },
        meta: {
            title: "Mỹ phẩm Pizu Nha Trang",
            description: "Cửa hàng mỹ phẩm Pizu tại Nha Trang",
            image: '/assets/img/share-image.jpg'
        }
    }
};