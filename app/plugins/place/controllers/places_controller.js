'use strict';

import mongoose from "mongoose";
import _ from "lodash";
import PlaceFinder from "../services/place_finder";

export default class PlacesController extends BaseController {

    async search() {
        let finder = new PlaceFinder(this.request.server);
        return await finder.perform(this.request.query.input);
    }
}
