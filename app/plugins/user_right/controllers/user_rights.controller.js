'use strict';

import mongoose from "mongoose";
import _ from "lodash";

const UserRight = mongoose.model('UserRight');

export default class UserRightsController extends BaseController {

    async example() {
       return this.h.view('user_right/views/example.html');
    }
}
