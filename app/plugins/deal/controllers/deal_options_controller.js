'use strict';

import mongoose from "mongoose";
import _ from "lodash";
import { BaseController } from "@core/modules";

const DealOption = mongoose.model('DealOption');

export default class DealOptionssController extends BaseController {

    async index() {
        if (this.request.isXhrRequest) {
            let { page, perPage } = this.request.query;

            let options = await DealOption.find({
                deal: this.request.params.dealId
            }).sort('-createdAt')
                .skip(((page || 1) - 1) * perPage)
                .limit(Number(perPage))
                .lean();

            return options;
        }
    }
}
