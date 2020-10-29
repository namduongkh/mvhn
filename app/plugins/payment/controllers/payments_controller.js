'use strict';

import mongoose from "mongoose";
import _ from "lodash";
import Boom from "boom";
import { BaseController } from "@core/modules";

const Payment = mongoose.model('Payment');
const User = mongoose.model('User');

export default class PaymentsController extends BaseController {

    async index() {
        if (this.request.isXhrRequest) {
            let { page, perPage } = this.request.query;
            let { uid } = this.request.auth.credentials;

            let payments = await Payment.find({
                status: 1,
                user: uid
            }).sort('-createdAt')
                .skip(((page || 1) - 1) * perPage)
                .limit(Number(perPage))
                .lean();

            return payments;
        }

        return this.h.view('payment/views/index.html', {
            meta: {
                title: 'Payments',
                description: 'Payments',
                hideNavBar: true,
                hideFooter: true
            }
        });
    }

    async create() {
        let { uid } = this.request.auth.credentials;
        let user = await User.findById(uid);
        let payment = await user.createPayment(this.request.payload.amount, 'Cash');

        return payment;
    }

    async delete() {
        let payment = await Payment.findById(this.request.params.id);
        if (payment.paymentStatus != 'pending') return Boom.badRequest('Payment can not remove');
        payment.remove();
        return payment;
    }
}
