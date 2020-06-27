'use strict';

import mongoose from "mongoose";
import _ from "lodash";
import { BaseController } from "@core/modules";

const <%= modelName %> = mongoose.model('<%= modelName %>');

export default class <%= controllerName %>Controller extends BaseController {

    async index() {
        return this.h.view('<%= pluginName %>/views/index.html');
    }
}
