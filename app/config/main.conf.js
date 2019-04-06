'use strict';
const Pack = require(global.BASE_PATH + '/package');
const frontend = require('./general/frontend.js');
const Info = require('./data/infomation');

module.exports = {
    web: {
        name: Pack.name,
        db: {
            uri: 'mongodb://db_portfolio:phongnguyen.94@ds135305.mlab.com:35305/db_portfolio',
            options: {
                user: '',
                pass: ''
            }
        },
        upload: {
            path: process.cwd() + '/public/files',
            bannerPath: process.cwd() + '/public/files/banner/',
            postPath: process.cwd() + '/public/files/post/',
            productPath: process.cwd() + '/public/files/product/'
        },
        cookieOptions: {
            ttl: 7 * 24 * 60 * 60 * 1000, // expires 7 days from today
            encoding: 'none', // we already used JWT to encode
            isSecure: false, // warm & fuzzy feelings
            isHttpOnly: false, // prevent client alteration
            clearInvalid: false, // remove invalid cookies
            strictHeader: true, // don't allow violations of RFC 6265
            path: '/' // set the cookie for all routes
        },
        redisOptions: {
            host: '127.0.0.1', //13.228.4.248
            port: 6379,
            detect_buffers: true
        },
        jwt: {
            secret: 'L7FWdNnQU7cfmQ87WuucQFK3YZvNBuvc'
        },
        // connections: [{
        //     port: process.env.PORT || 5005,
        //     labels: ['web'],
        //     routes: {
        //         cors: {
        //             origin: ['*'],
        //             credentials: true
        //         }
        //     },
        //     router: {
        //         stripTrailingSlash: false
        //     }
        // }],
        plugins: [
            'core',
            'home'
        ],
        htmlCompress: true,
        isUseVersionResource: true,
        context: {
            meta: {
                title: `Hapi`,
                description: 'Hapi Project'.substr(0, 160),
                image: 'assets/img/share-image.png'
            },
            info: Info,
            cmsprefix: '/cms',
        },
        assets: frontend.assets,
        error: {
            user: {
                login: "/dang-nhap"
            },
            notFound: {
                url: "/404"
            }
        },
        template: 'webmag'
    },
    server: {
        host: 'localhost',
        port: process.env.PORT || 5000,
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
    paging: {
        defaultPageSize: 25,
        numberVisiblePages: 10,
        itemsPerPage: 20
    },
};