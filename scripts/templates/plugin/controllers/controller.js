'use strict';

import mongoose from "mongoose";
import _ from "lodash";

const <%= modelName %> = mongoose.model('<%= modelName %>');

export default class <%= modelName %>Controller extends BaseController {

    async example() {
       return this.h.view('<%= pluginName %>/views/example.html');
    }
}
