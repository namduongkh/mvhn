'use strict';

import mongoose from "mongoose";
import _ from "lodash";

const UserGroup = mongoose.model('UserGroup');

export default class UserGroupsController extends BaseController {

    async example() {
       return this.h.view('user_group/views/example.html');
    }
}
