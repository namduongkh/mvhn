'use strict';

import mongoose from "mongoose";
import _ from "lodash";
import PlaceFinder from "../services/place_finder";
import PlaceDetailFinder from "../services/place_detail_finder";
import Boom from "boom";

export default class PlacesController extends BaseController {

    async search() {
        if (process.env.NODE_ENV !== "development" && !this.request.isXhrRequest) throw Boom.badRequest();

        let finder = new PlaceFinder(this.request.server);
        return await finder.perform(this.request.query.input, {
            findAndSave: this.request.query.findAndSave
        });
    }

    async detail() {
        if (process.env.NODE_ENV !== "development" && !this.request.isXhrRequest) throw Boom.badRequest();

        let finder = new PlaceDetailFinder(this.request.server);
        return await finder.perform(this.request.query.placeId);
    }
}
