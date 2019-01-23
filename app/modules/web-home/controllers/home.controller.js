'use strict';
var nodemailer = require('nodemailer');

exports.index = {
    handler: function (request, reply) {
        return reply.view('web-home/views/index', {});
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
