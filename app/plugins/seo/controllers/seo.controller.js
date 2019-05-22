'use strict';

import sm from "sitemap";
import Boom from "boom";
import mongoose from "mongoose";
import slug from "slug";
const Post = mongoose.model('Post');

exports.googleVerify = {
    handler: function (request, h) {
        return h.file(BASE_PATH + `/app/plugins/seo/views/google${request.params.googleCode}.html`);
    }
};

exports.bingVerify = {
    handler: function (request, h) {
        return h.file(BASE_PATH + '/app/plugins/seo/views/BingSiteAuth.xml');
    }
};

exports.sitemap = {
    handler: function (request, h) {
        return h.view('seo/views/sitemap', null, { layout: false });
    }
};

exports.robots = {
    handler: function (request, h) {
        return h.file(BASE_PATH + '/app/plugins/seo/views/robots.txt');
    }
};

exports.sitemap_xml = {
    pre: [
        {
            method: async (request, h) => {
                return h(await Post.find({
                    status: { $in: [1, 2] },
                    category: { $in: [undefined, "post"] }
                }).lean());
            },
            assign: 'posts'
        },
        {
            method: async (request, h) => {
                return h(await Post.find({
                    status: { $in: [1, 2] },
                    category: "page"
                }).lean());
            },
            assign: 'pages'
        }
    ],
    handler: async function (request, h) {
        let config = request.server.configManager;
        let { posts, pages } = request.pre;
        let sitemap = sm.createSitemap({
            hostname: config.get('web.context.settings.services.webUrl'),
            cacheTime: 600000,        // 600 sec - cache purge period
            urls: [
                { url: '/', priority: 1 },
                { url: '/posts', changefreq: 'daily', priority: 0.8 },
                ...posts.map((post) => {
                    return {
                        url: '/posts/' + post.slug + '.pn', priority: 0.7
                    };
                }),
                ...pages.map((post) => {
                    return {
                        url: '/pages/' + post.slug + '.pn', priority: 0.8
                    };
                })
                // { url: '/page-2/', changefreq: 'monthly', priority: 0.7 },
                // { url: '/page-3/' },    // changefreq: 'weekly',  priority: 0.5
                // { url: '/page-4/', img: "http://urlTest.com" }
            ]
        });
        try {
            let xml = await new Promise(function (rs, rj) {
                sitemap.toXML(function (err, xml) {
                    if (err) {
                        rj(err);
                    }
                    return rs(xml);
                });
            });
            return h.response(xml).header('Content-Type', 'application/xml');;
        } catch (error) {
            throw Boom.badRequest();
        }
    }
};