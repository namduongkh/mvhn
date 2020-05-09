'use strict';

import mongoose from "mongoose";
import _ from "lodash";
import { BaseController } from "@core/modules";

const Socket = mongoose.model('Socket');

export default class SocketsController extends BaseController {

    async index() {
        return this.h.view('socket/views/index.html');
    }
}
