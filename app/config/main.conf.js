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
                port: process.env.PORT || 5005,
                labels: ['web'],
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
        ],
        htmlCompress: true,
        isUseVersionResource: true,
        context: {
            meta: {
                title: `${Info.name} - Web Developer`,
                description: Info.description.replace('<br/>', ' ').substr(0, 160),
                image: 'assets/img/share-image.png'
            },
            info: Info
        },
        assets: frontend.assets,
        error: {
            user: {
                login: "/dang-nhap"
            },
            notFound: {
                url: "/404.pn"
            }
        },
    }
};