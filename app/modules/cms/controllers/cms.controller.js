'use strict';
import nodemailer from 'nodemailer';

exports.index = {
    handler: function (request, reply) {
        return reply.view('cms/views/index', {});
    },
    auth: false
};
