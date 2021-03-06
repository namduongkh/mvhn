'use strict';

import mongoose from "mongoose";
import _ from "lodash";
import { BaseController } from "@core/modules";
import Boom from "boom";

const Script = mongoose.model('Script');

export default class ScriptsController extends BaseController {

    async run() {
        let script = await Script.findById(this.request.params.id);
        return await script.run({
            request: this.request,
            h: this.h
        }) || Boom.badRequest('Script error');
    }
}
