'use strict';

import mongoose from "mongoose";
import _ from "lodash";
import Boom from "boom";
import ProductService from "../services/product_service";

const Product = mongoose.model('Product');

export default class ProductController extends BaseController {

    beforeActions() {
        return {
            loadProduct: [["show"]],
        }
    }

    async show() {
        if (!this._context.product) throw Boom.notFound();
        return this.view('product/views/show.html');
    }

    async loadProduct() {
        this._context.product = await ProductService.loadProduct(this.request, {
            lean: true,
            populates: ["category"]
        });
    }
}
