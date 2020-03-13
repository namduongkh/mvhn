'use strict';

import mongoose from "mongoose";
import _ from "lodash";
import Boom from "boom";
import ProductService from "../services/product_service";

const Product = mongoose.model('Product');
const Store = mongoose.model('Store');

export default class ProductController extends BaseController {

    beforeActions() {
        return {
            loadProduct: [["show"]],
            loadStore: [["index"]],
        }
    }

    async index() {
        if (this.request.isXhrRequest) {
            delete this.request.query.storeId;
            this.request.query = Object.assign(this.request.query, {
                store: this.request.pre.loadStore._id,
                populates: [{
                    path: 'category',
                    select: 'name color'
                }]
            });
            let ctrl = new ResourcesController(Product, this.request, this.h);
            return await ctrl.index();
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
                description: striptags(this._context.product.content).substr(0, 160),
                color: this._context.product.category && this._context.product.category.color
            }
        });
    }

    async loadProduct() {
        this._context.product = await ProductService.loadProduct(this.request, {
            lean: true,
            populates: ["category", {
                path: "store",
                select: "name slug"
            }]
        });
    }

    async loadStore() {
        if (this.request.isXhrRequest) {
            let storeId = this.request.params.storeId || this.request.query.storeId;
            let store = await Store.findById(storeId).lean();
            if (!store) throw Boom.notFound();
            return store;
        }
    }
}
