'use strict';

import mongoose from 'mongoose';
import EmailSender from './services/email_sender.js';
import { Routes, ResourcesController } from "@core/modules";

const EmailQueue = mongoose.model('EmailQueue');

exports.register = function (server, options, next) {
    const cmsRoutes = new Routes(server);
    cmsRoutes.resources(ResourcesController, 'email_queues', EmailQueue);

    server.expose('EmailSender', EmailSender);
};

exports.register.attributes = {
    name: 'email_queue'
};
