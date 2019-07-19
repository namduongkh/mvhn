'use strict';

import mongoose from "mongoose";
import _ from "lodash";

const Link = mongoose.model('Link');

export default class LinksController extends BaseController {

    async example() {
       return this.h.view('link/views/example.html');
    }
}
