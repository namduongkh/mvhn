'use strict';

import mongoose from "mongoose";
import _ from "lodash";
import { BaseController } from "@core/modules";

const Carpool = mongoose.model('Carpool');

export default class CarpoolsController extends BaseController {

    async index() {
        return this.h.view('carpool/views/index.html', {
            meta: {
                title: 'Đi Chung Xe - Tiết Kiệm Chi Phí',
                description: 'Cùng chung một hành trình, sao ta không cùng đi để tiết kiệm chi phí?'
            }
        });
    }
}
