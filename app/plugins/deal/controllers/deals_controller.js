'use strict';

import mongoose from "mongoose";
import _ from "lodash";
import { BaseController } from "@core/modules";

const Deal = mongoose.model('Deal');

export default class DealsController extends BaseController {

    async index() {
        return this.h.view('deal/views/index.html', {
            meta: {
                title: 'Kèo Đây Múc Ngay',
                description: 'Kèo Đây Múc Ngay',
                hideNavBar: true,
                hideFooter: true
            }
        });
    }
}
