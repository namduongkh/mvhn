'use strict';

import mongoose from "mongoose";
import _ from "lodash";
import { BaseController } from "@core/modules";

const UserRight = mongoose.model('UserRight');

export default class UserRightsController extends BaseController {

    async example() {
       return this.h.view('user_right/views/example.html');
    }
}
