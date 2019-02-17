'use strict';
import nodemailer from 'nodemailer';
import sm from "sitemap";
import Boom from "boom";
import mongoose from "mongoose";
const Blog = mongoose.model('Blog');

exports.index = {
    handler: function (request, reply) {
        return reply.view('home/views/index', {});
    }
};

exports.contact = {
    handler: function (request, reply) {
        let {
            name,
            email,
            phone,
            message
        } = request.payload;

        let config = request.server.configManager;

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'openness.sender.email@gmail.com',
                pass: 'phongnguyen.94.1'
            }
        });

        var mailOptions = {
            from: email,
            to: config.get('web.context.info.email'),
            subject: `Website Contact Form: ${name}`,
            text: `You have received a new message from your website contact form.\n\nHere are the details:\n\nName: ${name}\n\nEmail: ${email}\n\nPhone: ${phone}\n\nMessage:\n${message}`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                return reply(false).code(400);
            } else {
                console.log('Email sent: ' + info.response);
                return reply(true);
            }
        });
    }
};

exports.sitemap = {
    pre: [
        {
            method: async (request, reply) => {
                return reply(await Blog.find({
                    status: 1,
                    category: { $in: [undefined, "blog"] }
                }).lean());
            },
            assign: 'blogs'
        },
        {
            method: async (request, reply) => {
                return reply(await Blog.find({
                    status: 1,
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