'use strict';

import mongoose from "mongoose";
import _ from "lodash";
import CmsRatingsController from "./cms_ratings.controller";

const Rating = mongoose.model('Rating');

export default class RatingsController extends BaseController {

    // async example() {
    //    return this.h.view('rating/views/example.html');
    // }

    async create() {
        let resp = await new CmsRatingsController(Rating, this.request, this.h).create();
        return resp;
    }

    async index() {
        let resp = await new CmsRatingsController(Rating, this.request, this.h).index();
        return resp;
    }
}
