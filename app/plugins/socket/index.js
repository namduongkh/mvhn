'use strict';

import mongoose from 'mongoose';
import _ from 'lodash';
import socketIo from 'socket.io';
import SocketsController from './controllers/sockets_controller.js';
import ConversationsController from './controllers/conversations_controller.js';
import NotificationsController from './controllers/notifications_controller.js';
import MessagesController from './controllers/messages_controller.js';
import StrangersController from './controllers/strangers_controller.js';
import WebPushesController from './controllers/web_pushes_controller.js';
import SocketHandler from "./services/base/socket_handler";
import { ServerRouter, Routes, ResourcesController } from "@core/modules";

const Socket = mongoose.model('Socket');

exports.register = function (server, options, next) {
    const serverRouter = new ServerRouter(server);
    const cmsRoutes = new Routes(server);
    cmsRoutes.resources(ResourcesController, 'sockets', Socket);

    serverRouter.resources('sockets', SocketsController, {
        only: ['index']
    });

    serverRouter.resources('web_pushes', WebPushesController, {
        only: []
    })
        .member('subscribe', 'POST');

    server.route({
        method: 'GET',
        path: '/sw.js',
        config: new WebPushesController('sw').routeConfig()
    });

    serverRouter.resources('conversations', ConversationsController, {}, {
        auth: {
            strategy: 'jwt'
        }
    });
    serverRouter.resources('conversations/{conversationId}/messages', MessagesController, {}, {
        auth: {
            strategy: 'jwt'
        }
    });
    serverRouter.resources('notifications', NotificationsController, {
        only: ['index']
    }, {
        auth: {
            strategy: 'jwt'
        }
    })
        .member('{id}/seen', { method: 'PUT', action: 'seen' })
        .member('unseen_number', { method: 'GET', action: 'unseenNumber' });
    serverRouter.resources('chat-cung-nguoi-la', StrangersController, {
        only: ['index']
    });
    serverRouter.resources('chat-cung-nguoi-la', StrangersController, {
        only: ['create']
    }, {
        auth: {
            strategy: 'jwt'
        }
    });

    const io = socketIo(server.listener, _.extend({ serverOptions: {} }, options));
    new SocketHandler(io).perform();

    server.expose('io', io);
};

exports.register.attributes = {
    name: 'socket'
};
