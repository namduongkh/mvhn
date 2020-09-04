'use strict';

import mongoose from "mongoose";
import _ from "lodash";
import { BaseController, ResourcesController } from "@core/modules";

const Stranger = mongoose.model('Stranger');

export default class StrangersController extends BaseController {

    async index() {
        let stranger = await this.getStranger();
        await stranger.setReady(false);

        if (this.request.isXhrRequest) return stranger;

        return this.h.view('socket/views/conversations/stranger.html', {
            stranger,
            meta: {
                title: 'Chat Cùng Người Lạ',
                description: 'Chat cùng người lạ, cùng chia sẻ tâm tư tình cảm với một người xa lạ, không lo âu phiền toái, mọi khó khăn đều tan biến',
                hideNavBar: true,
                hideFooter: true
            }
        });
    }

    async create() {
        let stranger = await this.getStranger();
        if (stranger.conversation) {
            return {
                status: true, message: 'Đang bắt đầu...',
                data: stranger.conversation
            }
        }

        await stranger.setReady(true);

        let readyStranger = await Stranger.findReadyStranger(stranger._id);

        if (readyStranger) {
            let conversation = await Stranger.createConversation([stranger, readyStranger]);

            return {
                status: true, message: 'Đang bắt đầu...',
                data: conversation._id
            }
        }

        return { status: false, message: 'Đang tìm kiếm...' }
    }

    async getStranger() {
        let { uid } = this.request.auth.credentials;
        return await Stranger.findOrCreateByUserId(uid);
    }
}
