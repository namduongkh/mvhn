'use strict';

import mongoose from "mongoose";
import _ from "lodash";
import Boom from "boom";

const Store = mongoose.model('Store');
const StoreOrder = mongoose.model('StoreOrder');
const StoreTable = mongoose.model('StoreTable');

export default class StoreTablesController extends BaseController {

    beforeActions() {
        return {
            loadStore: [['index']]
        };
    }

    async index() {
        let storeTables = await StoreTable.find({ store: this.store._id }).populate('activeOrder');

        if (this.request.isXhrRequest) return storeTables;
    }

    async show() {
        let storeTable = await StoreTable.findById(this.request.params.id).populate('store');

        if (this.request.isXhrRequest) return storeTable;

        return this.h.view('store_table/views/show.html', {
            storeTable,
            store: storeTable.store,
            meta: { title: storeTable.name }
        });
    }

    async createOrder() {
        let { uid } = this.request.auth.credentials;
        let { id } = this.request.params;
        let { storeId } = this.request.params;

        let storeTable = await StoreTable.findById(id);
        if (!storeTable.activeOrder) {
            let existedOrder = await StoreOrder.findOne({
                customer: uid,
                store: storeId,
                $and: [{ storeTable: { $ne: id } }, { storeTable: { $ne: null } }, { storeTable: { $ne: undefined } }]
            }).lean();

            if (existedOrder) throw Boom.badRequest('Bạn đang được phục vụ!');
        }

        let newOrder = new StoreOrder({
            customer: uid,
            store: storeId,
            storeTable: id,
            orderStatus: 'ordering'
        });

        storeTable.activeOrder = newOrder._id;
        storeTable.save();
        newOrder = await newOrder.save();

        return newOrder;
    }

    async update() {
        let resources = new ResourcesController(StoreTable, this.request, this.h);
        let resp = await resources.update();
        return resp;
    }

    async loadStore() {
        let storeId = this.request.params.storeId || this.request.query.storeId;
        let store = await Store.findById(storeId).lean();
        if (!store) throw Boom.notFound();
        this.store = store;
    }
}
