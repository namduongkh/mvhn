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

        if (this.request.headers.accept.includes('application/json')) {
            return this._context.product;
        }

        return this.view('product/views/show.html', {
            meta: {
                title: this._context.product.name,
                image: this._context.product.thumb,
                description: striptags(this._context.product.description).substr(0, 160)
            }
        });
    }

    async loadProduct() {
        this._context.product = await ProductService.loadProduct(this.request, {
            lean: true,
            populates: ["category"]
        });
    }
}
