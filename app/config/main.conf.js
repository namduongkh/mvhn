'use strict';
const fs = require('fs');
const _ = require('lodash');
const Pack = require(global.BASE_PATH + '/package');

global.BUNDLE_PATH = process.env.NODE_ENV == "development" ? "public/src" : "public/dist";
global.CMS_BUNDLE_PATH = process.env.NODE_ENV == "development" ? "public/cms/src" : "public/cms/dist";
global.COOKIE_NAME = Pack.name + '-token';

const TEMPLATE_NAMES = fs.readdirSync(global.BASE_PATH + '/app/config/template').map(name => name.replace('.js', '')); // All template name
const TEMPLATE_NAME = 'webmag'; // The choosen template folder
const ASSETS = _.fromPairs(TEMPLATE_NAMES.map((name) => { return [name, require('./template/' + name).assets] }));

const PORT = process.env.PORT || 7000;
const WEB_URL = process.env.WEB_URL || `http://localhost:${PORT}`;
const CMS_PREFIX = process.env.CMS_PREFIX || 'cms';

module.exports = {
    web: {
        name: Pack.name,
        db: {
            host: 'localhost:27017',
            user: '',
            password: '',
            name: 'db_mvhn_app'
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
        htmlCompress: true,
        isUseVersionResource: true,
        context: {
            meta: {
                title: `MVHN Project`,
                description: 'MVHN Project'.substr(0, 160),
                image: 'assets/img/share-image.png',
                color: '#378C3F'
            },
            info: {
                name: 'Phong Nguyễn'
            },
            cmsprefix: CMS_PREFIX,
            settings: {
                services: {
                    webUrl: `${WEB_URL}`,
                    cmsUrl: `/${CMS_PREFIX}`
                },
            },
            template: TEMPLATE_NAME,
        },
        templates: TEMPLATE_NAMES,
        assets: ASSETS,
        error: {
            user: {
                login: "/login"
            },
            notFound: {
                url: "/404"
            }
        }
    },
    server: {
        port: PORT,
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
