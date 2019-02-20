'use strict';

import sm from "sitemap";
import Boom from "boom";
import mongoose from "mongoose";
const Blog = mongoose.model('Blog');

exports.googleVerify = {
    handler: function (request, reply) {
        return reply(`google-site-verification: google${request.params.googleCode}.html`)
    }
};

exports.bingVerify = {
    handler: function (request, reply) {
        return reply.file(BASE_PATH + '/app/modules/seo/views/BingSiteAuth.xml');
    }
};

exports.sitemap = {
    handler: function (request, reply) {
        return reply.view('seo/views/sitemap', null, { layout: false });
    }
};

exports.sitemap_xml = {
    pre: [
        {
            method: async (request, reply) => {
                return reply(await Blog.find({
                    status: { $in: [1, 2] },
                    category: { $in: [undefined, "blog"] }
                }).lean());
            },
            assign: 'blogs'
        },
        {
            method: async (request, reply) => {
                return reply(await Blog.find({
                    status: { $in: [1, 2] },
                    category: "page"
                }).lean());
            },
            assign: 'pages'
        }
    ],
    handler: async function (request, reply) {
        let config = request.server.configManager;
        let { blogs, pages } = request.pre;
        let sitemap = sm.createSitemap({
            hostname: config.get('web.context.settings.services.webUrl'),
            cacheTime: 600000,        // 600 sec - cache purge period
            urls: [
                { url: '/', changefreq: 'daily', priority: 0.3 },
                { url: '/blogs', changefreq: 'daily', priority: 0.3 },
                ...blogs.map((blog) => {
                    return {
                        url: '/blogs/' + blog.slug + '.pn'
                    };
                }),
                ...pages.map((blog) => {
                    return {
                        url: '/pages/' + blog.slug + '.pn', changefreq: 'daily', priority: 0.3
                    };
                })
                // { url: '/page-2/', changefreq: 'monthly', priority: 0.7 },
                // { url: '/page-3/' },    // changefreq: 'weekly',  priority: 0.5
                // { url: '/page-4/', img: "http://urlTest.com" }
            ]
        });
        sitemap.toXML(function (err, xml) {
            if (err) {
                return reply(Boom.badRequest());
            }
            return reply(xml).header('Content-Type', 'application/xml');;
        });
    }
};