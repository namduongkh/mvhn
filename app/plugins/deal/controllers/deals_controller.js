'use strict';

import mongoose from "mongoose";
import _ from "lodash";
import { BaseController } from "@core/modules";

const Deal = mongoose.model('Deal');

export default class DealsController extends BaseController {

    async index() {
        if (this.request.isXhrRequest) {
            let { page, perPage } = this.request.query;

            let deals = await Deal.find({
                status: 1
            }).sort('-createdAt')
                .populate('user', 'name avatar')
                .skip(((page || 1) - 1) * perPage)
                .limit(Number(perPage))
                .lean();

            return deals;
        }

        return this.h.view('deal/views/index.html', {
            meta: {
                title: 'Chốt Kèo Ngay',
                description: 'Chốt Kèo Ngay',
                hideNavBar: true,
                hideFooter: true
            }
        });
    }
}
