'use strict';

import mongoose from 'mongoose';
import _ from 'lodash';
import socketIo from 'socket.io';
import SocketsController from './controllers/sockets_controller.js';
import SocketHandler from "./services/base/socket_handler";

const Socket = mongoose.model('Socket');

exports.register = function (server, options, next) {
    const serverRouter = new ServerRouter(server);
    const cmsRoutes = new Routes(server);
    cmsRoutes.resources(ResourcesController, 'sockets', Socket);

    serverRouter.resources('sockets', SocketsController, {
        only: ['index']
    });

    const io = socketIo(server.listener, _.extend({ serverOptions: {} }, options));
    new SocketHandler(io).perform();

    server.expose('io', io);
};

exports.register.attributes = {
    name: 'socket'
};
