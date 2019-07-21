'use strict';

import mongoose from "mongoose";
import _ from "lodash";

const Store = mongoose.model('Store');

export default class StoresController extends BaseController {

    async example() {
       return this.h.view('store/views/example.html');
    }
}
