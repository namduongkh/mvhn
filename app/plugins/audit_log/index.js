'use strict';

import mongoose from 'mongoose';
import AuditLogsController from './controllers/audit_logs.controller.js';
const AuditLog = mongoose.model('AuditLog');

exports.register = function (server, options, next) {
    const serverRouter = new ServerRouter(server);
    const cmsRoutes = new Routes(server);
    cmsRoutes.resources(ResourcesController, 'audit_logs', AuditLog);

    serverRouter.resources('audit_logs', AuditLogsController, {
        only: ['index']
    });
};

exports.register.attributes = {
    name: 'audit_log'
};