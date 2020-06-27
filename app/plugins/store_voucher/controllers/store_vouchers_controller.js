'use strict';

import mongoose from "mongoose";
import _ from "lodash";
import { BaseController } from "@core/modules";

const StoreVoucher = mongoose.model('StoreVoucher');

export default class StoreVouchersController extends BaseController {

    async reduce() {
        let { amount, voucherCode } = this.request.query;
        let voucher = await StoreVoucher.findOne({ code: voucherCode });

        if (!voucher || !voucher.quantity) {
            return {
                status: false,
                message: 'Voucher không hợp lệ'
            };
        } else {
            return {
                status: true,
                data: await voucher.reduce(amount)
            };
        }
    }
}
