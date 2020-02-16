'use strict';

import mongoose from "mongoose";
import _ from "lodash";
import Boom from "boom";

const Store = mongoose.model('Store');
const Rating = mongoose.model('Rating');

export default class StoresController extends BaseController {

    async storeDetail() {
        let { slug } = this.request.params;
        let store = await Store.findOne({ slug, status: 1 }).lean();
        if (!store || !store._id) {
            return Boom.notFound();
        }
        return this.h.view('store/views/store_detail.html', {
            store: _.merge(store, {
                ratingStar: await this.storeRating(store._id)
            }), meta: {
                title: store.name,
                description: store.name,
                image: store.logo
            },
            registerLazyMode: true
        }, { layout: 'layout-blank' });
    }

    async storeRating(storeId) {
        let ratings = await Rating.find({ object: storeId, status: 1 }, "star").lean();
        return _.round(_.sumBy(ratings, 'star') / ratings.length);
    }
}
