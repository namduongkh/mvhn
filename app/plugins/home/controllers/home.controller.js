'use strict';
import nodemailer from 'nodemailer';
import mongoose from 'mongoose';

const Post = mongoose.model('Post');

exports.index = {
    handler: async function (request, h) {
        let posts = await Post.find({
            status: 1
        }, 'title slug category createdAt thumb')
            .sort("-createAt")
            .populate('category', 'name slug color textClassname')
            .limit(20)
            .lean();

        return h.view('home/views/index', { posts });
    },
    auth: false
};

exports.portfolio = {
    handler: function (request, h) {
        return h.view('home/views/portfolio', {
            meta: {
                title: "Portfolio",
                description: "Some projects I have done, an overview to know and understand what I do. Phong Nguyen - Web Developer"
            },
            paddingTop: true
        });
    }
};

exports.contact = {
    handler: function (request, h) {
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
                return h.response(false).code(400);
            } else {
                console.log('Email sent: ' + info.response);
                return h.response(true);
            }
        });
    }
};
