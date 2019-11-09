'use strict';

import mongoose from "mongoose";
import _ from "lodash";

const AuditLog = mongoose.model('AuditLog');

export default class AuditLogsController extends BaseController {

    async index() {
        return this.h.view('audit_log/views/index.html');
    }
}
