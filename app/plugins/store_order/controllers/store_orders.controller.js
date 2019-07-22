'use strict';

import mongoose from "mongoose";
import _ from "lodash";

const StoreOrder = mongoose.model('StoreOrder');

export default class StoreOrdersController extends BaseController {

    async example() {
       return this.h.view('store_order/views/example.html');
    }
}
