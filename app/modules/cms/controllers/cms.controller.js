'use strict';
import nodemailer from 'nodemailer';

exports.index = {
    handler: function (request, reply) {
        return reply.view('cms/views/index', {}, {
            layout: 'cms/layout'
        });
    },
    auth: false
};
