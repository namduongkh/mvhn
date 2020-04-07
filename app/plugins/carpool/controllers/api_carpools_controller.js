'use strict';

import mongoose from "mongoose";
import _ from "lodash";

const Carpool = mongoose.model('Carpool');

export default class ApiCarpoolsController extends BaseController {

    async index() {
        let options = { status: 1 };
        let { query } = this.request;

        for (let i in query) {
            if (['fromPlace', 'toPlace'].includes(i.toString())) {
                options[i] = query[i];
            }
        }

        let carpools = await Carpool.find(options)
            .sort('time createdAt')
            .populate('fromPlace')
            .populate('toPlace')
            .populate('user')
            .lean();

        return carpools;
    }
}
