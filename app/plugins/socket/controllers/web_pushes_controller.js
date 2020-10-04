'use strict';

import _ from "lodash";
import { BaseController } from "@core/modules";

export default class WebPushesController extends BaseController {

    async subscribe() {
        return this.h.response({}).code(201)
    }

    async sw() {
        return this.h.file(BASE_PATH + '/app/plugins/socket/views/js/services/sw.js');
    }
}
