'use strict';

import mongoose from "mongoose";
import _ from "lodash";

const StoreTable = mongoose.model('StoreTable');

export default class StoreTablesController extends BaseController {

    async example() {
       return this.h.view('store_table/views/example.html');
    }
}
