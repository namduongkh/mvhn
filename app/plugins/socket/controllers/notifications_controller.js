'use strict';

import mongoose from "mongoose";
import _ from "lodash";
import { BaseController, ResourcesController } from "@core/modules";

const Conversation = mongoose.model('Conversation');
const Message = mongoose.model('Message');

export default class NotificationsController extends BaseController {

    async index() {
        if (this.request.isXhrRequest) {
            let { uid } = this.request.auth.credentials;
            let conversation = await Conversation.findOrCreateNotificationByUserId(uid);

            return conversation.messages();
        }

        return this.h.view('socket/views/notifications/index.html');
    }

    async seen() {
        let message = await Message.findById(this.request.params.id);
        message.seenBy(this.request.payload.userId);
        return message;
    }

    async unseenNumber() {
        let { uid } = this.request.auth.credentials;
        let conversation = await Conversation.findOrCreateNotificationByUserId(uid);
        return conversation.unseenNumber(uid);
    }
}
