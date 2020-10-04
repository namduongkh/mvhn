'use strict';

import mongoose from "mongoose";
import _ from "lodash";
import { BaseController, ResourcesController } from "@core/modules";

const Conversation = mongoose.model('Conversation');

export default class ConversationsController extends BaseController {

    async index() {
        if (this.request.isXhrRequest) {
            this.request.query = Object.assign(this.request.query || {}, {
                user: { $elemMatch: { $eq: this.request.auth.credentials.uid } }
            });
            let service = new ResourcesController(Conversation, this.request, this.h);

            return await service.index();
        }

        return this.h.view('socket/views/conversations/index.html');
    }

    async create() {
        let service = new ResourcesController(Conversation, this.request, this.h);
        return await service.create();
    }

    async delete() {
        let service = new ResourcesController(Conversation, this.request, this.h);
        return await service.delete();
    }

    async stranger() {
        return this.h.view('socket/views/conversations/stranger.html');
    }
}
