'use strict';

import mongoose from "mongoose";
import _ from "lodash";

const Setting = mongoose.model('Setting');

export default class SettingController extends BaseController {

    async example() {
       return this.h.view('setting/views/example.html');
    }
}
