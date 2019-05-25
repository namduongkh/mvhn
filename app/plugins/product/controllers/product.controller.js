'use strict';

import mongoose from "mongoose";
import _ from "lodash";

const Product = mongoose.model('Product');

export default class ProductController extends BaseController {

    async example() {
       return this.h.view('product/views/example.html');
    }
}
