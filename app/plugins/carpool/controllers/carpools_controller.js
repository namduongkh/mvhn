'use strict';

import mongoose from "mongoose";
import _ from "lodash";
import { BaseController } from "@core/modules";

const Carpool = mongoose.model('Carpool');

export default class CarpoolsController extends BaseController {

    async index() {
        return this.h.view('carpool/views/index.html');
    }
}
