'use strict';

import mongoose from "mongoose";
import _ from "lodash";
import Boom from "boom";
import { BaseController } from "@core/modules";

const Store = mongoose.model('Store');
const Rating = mongoose.model('Rating');

export default class StoresController extends BaseController {

    async show() {
        let { id } = this.request.params;
        let query = { status: { $in: [0, 1] } };

        if (mongoose.Types.ObjectId.isValid(id)) {
            query._id = id;
        } else {
            query.slug = id;
        }

        let store = await Store.findOne(query).lean();
        if (!store || !store._id) throw Boom.notFound();

        if (this.request.headers.accept.includes('application/json')) {
            return store;
        }

        return this.h.view('store/views/store_detail.html', {
            store: _.merge(store, {
                ratingStar: await this.storeRating(store._id)
            }), meta: {
                title: store.name,
                description: store.name,
                image: store.logo,
                hideNavBar: true
            },
        });
    }

    async storeRating(storeId) {
        let ratings = await Rating.find({ object: storeId, status: 1 }, "star").lean();
        return _.round(_.sumBy(ratings, 'star') / ratings.length);
    }
}
