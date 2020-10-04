'use strict';

import mongoose from "mongoose";
import _ from "lodash";
import { BaseController, ResourcesController } from "@core/modules";

const Message = mongoose.model('Message');

export default class MessagesController extends BaseController {

    async index() {
        this.request.query = Object.assign(this.request.query || {}, {
            conversation: this.request.params.conversationId,
            sort: 'createdAt|desc'
        });
        let service = new ResourcesController(Message, this.request, this.h);

        return await service.index();
    }

    async create() {
        let service = new ResourcesController(Message, this.request, this.h);
        return await service.create();
    }

    async delete() {
        let service = new ResourcesController(Message, this.request, this.h);
        return await service.delete();
    }
}
