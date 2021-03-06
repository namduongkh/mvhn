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

const DB_CONFIG = {
    protocol: process.env.DB_PROTOCOL || 'mongodb://',
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME
};

module.exports = {
    web: {
        name: Pack.name,
        db: DB_CONFIG,
        upload: {
            path: process.cwd() + '/public/files',
            bannerPath: process.cwd() + '/public/files/banner/',
            postPath: process.cwd() + '/public/files/post/',
            productPath: process.cwd() + '/public/files/product/'
        },
        cookieOptions: {
            ttl: 30 * 24 * 60 * 60 * 1000, // expires 30 days from today
            encoding: 'none', // we already used JWT to encode
            isSecure: false, // warm & fuzzy feelings
            isHttpOnly: false, // prevent client alteration
            clearInvalid: false, // remove invalid cookies
            strictHeader: true, // don't allow violations of RFC 6265
            path: '/' // set the cookie for all routes
        },
        redisOptions: {
            url: process.env.REDIS_URL,
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
                color: '#2C3E50'
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
                browserCookieSaving: process.env.BROWSER_COOKIE_SAVING || false,
                publicVapidKey: process.env.PUBLIC_VAPID_KEY,
            },
            template: TEMPLATE_NAME,
            enableLazyRegister: process.env.ENABLE_LAZY_REGISTER || true,
            enableSocialLogin: process.env.ENABLE_SOCIAL_LOGIN || false,
        },
        templates: TEMPLATE_NAMES,
        assets: ASSETS,
        error: {
            user: {
                login: "/users/login"
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
    mailer: {
        options: {
            service: 'gmail',
            auth: {
                user: 'openness.sender.email@gmail.com',
                pass: 'phongnguyen.94.1'
            }
        },
        defaults: {
            from: {
                name: 'Múc Ngay',
                address: 'noreply@mucngay.info'
            }
        }
    },
    facebookApi: {
        apiKey: process.env.FACEBOOK_API_KEY,
        secretKey: process.env.FACEBOOK_SECRET_KEY
    },
    googleApi: {
        apiKey: process.env.GOOGLE_API_KEY,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
    },
    webPush: {
        public: process.env.PUBLIC_VAPID_KEY,
        private: process.env.PRIVATE_VAPID_KEY,
    }
};
