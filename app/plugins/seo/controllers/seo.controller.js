'use strict';

import sm from "sitemap";
import Boom from "boom";
import mongoose from "mongoose";
import fs from "fs";
import slug from "slug";
const Post = mongoose.model('Post');
const Property = mongoose.model('Property');

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

exports.generateSitemapXml = {
    pre: [
        {
            method: async (request, h) => {
                return await Post.find({
                    status: 1
                }, 'slug').sort('-createdAt').lean().limit(5000);
            },
            assign: 'posts'
        },
        {
            method: async (request, h) => {
                return await Property.find({
                    status: 1,
                    type: 'category'
                }, 'slug').lean();
            },
            assign: 'categories'
        },
        // {
        //     method: async (request, h) => {
        //         return h(await Post.find({
        //             status: { $in: [1, 2] },
        //             category: "page"
        //         }).lean());
        //     },
        //     assign: 'pages'
        // }
    ],
    handler: async function (request, h) {
        let config = request.server.configManager;
        let {
            posts,
            categories
        } = request.pre;
        let sitemap = sm.createSitemap({
            hostname: config.get('web.context.settings.services.webUrl'),
            cacheTime: 600000,        // 600 sec - cache purge period
            urls: [
                { url: '/', priority: 1 },
                ...categories.map((category) => {
                    return {
                        url: '/categories/' + category.slug, priority: 0.8,
                        changefreq: 'daily'
                    };
                }),
                ...posts.map((post) => {
                    return {
                        url: '/posts/' + post.slug, priority: 0.7
                    };
                }),
                // ...pages.map((post) => {
                //     return {
                //         url: '/pages/' + post.slug + '.pn', priority: 0.8
                //     };
                // })
                // { url: '/page-2/', changefreq: 'monthly', priority: 0.7 },
                // { url: '/page-3/' },    // changefreq: 'weekly',  priority: 0.5
                // { url: '/page-4/', img: "http://urlTest.com" }
            ]
        });
        try {
            await new Promise(function (rs, rj) {
                sitemap.toXML(function (err, xml) {
                    if (err) {
                        rj(err);
                    }
                    fs.writeFileSync(BASE_PATH + '/app/plugins/seo/views/sitemap.xml', xml);
                    return rs();
                });
            });
            return "Done!";
        } catch (error) {
            throw Boom.badRequest();
        }
    }
};

exports.sitemap_xml = {
    handler: async (request, h) => {
        // return h.file(BASE_PATH + '/app/plugins/seo/views/sitemap.xml');
        let config = request.server.configManager;
        let {
            posts,
            categories
        } = request.pre;
        let sitemap = sm.createSitemap({
            hostname: config.get('web.context.settings.services.webUrl'),
            cacheTime: 600000,        // 600 sec - cache purge period
            urls: [
                { url: '/', priority: 1 },
                ...categories.map((category) => {
                    return {
                        url: '/categories/' + category.slug, priority: 0.8,
                        changefreq: 'daily'
                    };
                }),
                ...posts.map((post) => {
                    return {
                        url: '/posts/' + post.slug, priority: 0.7
                    };
                }),
                // ...pages.map((post) => {
                //     return {
                //         url: '/pages/' + post.slug + '.pn', priority: 0.8
                //     };
                // })
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
}