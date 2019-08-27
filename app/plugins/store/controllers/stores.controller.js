'use strict';

import mongoose from "mongoose";
import _ from "lodash";
import Boom from "boom";

const Store = mongoose.model('Store');

export default class StoresController extends BaseController {

    async storeDetail() {
        let { slug } = this.request.params;
        let store = await Store.findOne({ slug, status: 1 }).lean();
        if (!store || !store._id) {
            return Boom.notFound();
        }
        return this.h.view('store/views/store_detail.html', {
            store, meta: {
                title: store.name
            }
        }, { layout: 'layout-blank' });
    }
}
