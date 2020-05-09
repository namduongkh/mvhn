'use strict';

import mongoose from 'mongoose';
import StoreVouchersController from './controllers/store_vouchers_controller.js';
import { ServerRouter, Routes, ResourcesController } from "@core/modules";

const StoreVoucher = mongoose.model('StoreVoucher');

exports.register = function (server, options, next) {
    const serverRouter = new ServerRouter(server);
    const cmsRoutes = new Routes(server);
    cmsRoutes.resources(ResourcesController, 'store_vouchers', StoreVoucher);

    serverRouter.resources('store_vouchers', StoreVouchersController, {
        only: []
    }).member('reduce');
};

exports.register.attributes = {
    name: 'store_voucher'
};
