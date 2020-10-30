'use strict';

import mongoose from "mongoose";
import _ from "lodash";
import { BaseController } from "@core/modules";
import CmsBetsController from "./cms_bets_controller";
import Boom from "boom";

const Deal = mongoose.model('Deal');
const DealOption = mongoose.model('DealOption');
const Bet = mongoose.model('Bet');

export default class BetsController extends BaseController {

    async index() {
        let { uid } = this.request.auth.credentials;
        if (!uid) return false;

        this.request.query.user = uid;
        if (this.request.params.dealId)
            this.request.query.deal = this.request.params.dealId;
        if (this.request.params.dealOptionId)
            this.request.query.option = this.request.params.dealOptionId;

        let resources = new CmsBetsController(Bet, this.request, this.h);
        return await resources.index();
    }

    async create() {
        let { uid } = this.request.auth.credentials;
        if (!uid) return false;

        let { dealOptionId } = this.request.params;

        if (dealOptionId) {
            let option = await DealOption.findById(dealOptionId).lean();
            var deal = await Deal.findById(option.deal).lean();
        }

        if (deal && (
            deal.stop ||
            (deal.to && moment(deal.to) < moment())
        )) {
            return Boom.badRequest('Kèo đã kết thúc')
        }

        this.request.payload.user = uid;
        let resources = new CmsBetsController(Bet, this.request, this.h);
        return await resources.create();
    }
}
