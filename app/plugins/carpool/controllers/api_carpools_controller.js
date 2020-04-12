'use strict';

import mongoose from "mongoose";
import _ from "lodash";
import Boom from "boom";

const Carpool = mongoose.model('Carpool');

export default class ApiCarpoolsController extends BaseController {

    beforeActions() {
        return {
            loadCarpool: [['delete'], ['join'], ['leave']]
        }
    }

    async index() {
        let options = {
            status: 1,
            time: {
                $gte: Date.now()
            },
            "participates.0": {
                "$exists": false
            }
        };
        let { query } = this.request;

        for (let i in query) {
            if (['fromPlace', 'toPlace'].includes(i.toString())) {
                try {
                    options[i] = JSON.parse(query[i]);
                } catch (error) {
                    options[i] = query[i];
                }
            }
        }

        return await this.loadCarpools(options);
    }

    async connected() {
        let options = {
            status: 1,
            participates: this.request.auth.credentials.uid
        };

        return await this.loadCarpools(options);
    }

    async mine() {
        let options = {
            status: 1,
            user: this.request.auth.credentials.uid
        };

        return await this.loadCarpools(options);
    }

    async create() {
        let carpool = new Carpool(this.request.payload);
        carpool.user = this.request.auth.credentials.uid;
        await carpool.save();

        return carpool;
    }

    async show() {
        return await Carpool.findById(this.request.params.id)
            .populate('fromPlace')
            .populate('toPlace')
            .populate('user')
            .lean();
    }

    async delete() {
        await this._context.carpool.remove();
        return true;
    }

    async join() {
        this._context.carpool.participates.push(this.request.auth.credentials.uid)
        await this._context.carpool.save();
        return true;
    }

    async leave() {
        this._context.carpool.participates = this._context.carpool.participates.filter((i) => {
            return i.toString() !== this.request.auth.credentials.uid.toString()
        });
        await this._context.carpool.save();
        return true;
    }

    async loadCarpool() {
        this._context.carpool = await Carpool.findById(this.request.params.id);
        if (!this._context.carpool) throw Boom.notFound();
        return this._context.carpool;
    }

    async loadCarpools(options) {
        let carpools = await Carpool.find(options)
            .sort('time createdAt')
            .populate('fromPlace')
            .populate('toPlace')
            .populate('user')
            .lean();

        return carpools;
    }
}
