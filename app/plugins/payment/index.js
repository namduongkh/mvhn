'use strict';

import mongoose from 'mongoose';
import PaymentsController from './controllers/payments_controller.js';
import CmsPaymentsController from './controllers/cms_payments_controller.js';
import { ServerRouter, Routes, ResourcesController } from "@core/modules";

const Payment = mongoose.model('Payment');

exports.register = function (server, options, next) {
    const serverRouter = new ServerRouter(server);
    const cmsRoutes = new Routes(server);
    cmsRoutes.resources(CmsPaymentsController, 'payments', Payment)
    cmsRoutes.customRoute('POST', '{id}/approve', CmsPaymentsController, 'approve', Payment);

    serverRouter.resources('payments', PaymentsController, {}, {
        auth: 'jwt'
    });
};

exports.register.attributes = {
    name: 'payment'
};
