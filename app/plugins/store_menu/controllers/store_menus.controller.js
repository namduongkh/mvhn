'use strict';

import mongoose from "mongoose";
import _ from "lodash";

const StoreMenu = mongoose.model('StoreMenu');

export default class StoreMenusController extends BaseController {

    async example() {
       return this.h.view('store_menu/views/example.html');
    }
}
