'use strict';

import mongoose from "mongoose";
import _ from "lodash";

const StoreVoucher = mongoose.model('StoreVoucher');

export default class StoreVouchersController extends BaseController {

    async index() {
        return this.h.view('store_voucher/views/index.html');
    }
}
