'use strict';

import AuthController from './controllers/auth.controller.js';
import AuthMid from './middleware/auth.middleware.js';
import AuthVal from './validate/auth.validate.js';
import UserMiddleware from './middleware/user';
import CmsUsersController from "./controllers/cms_users.controller";
import mongoose from "mongoose";
import UsersController from "./controllers/users_controller";

const User = mongoose.model('User');

exports.register = (server, options, next) => {
    var Auth = require('./util/auth');
    server.expose('auth', new Auth(server));

    const routes = new Routes(server);
    routes.resources(CmsUsersController, 'users', User);

    // Users routes
    new ServerRouter(server).resources('users', UsersController, { only: [] }).member('login');

    // let userUtil = new UserUtil(server);
    // server.expose('UserUtil', userUtil);

    let userMiddleware = new UserMiddleware(server);
    server.expose('UserMiddleware', userMiddleware);

    ///////////////// WEB /////////////////
    server.route({
        method: 'POST',
        path: '/api/user/verify/email',
        handler: AuthController.verifyemail,
        config: {
            validate: AuthVal.verifyemail,
            pre: [
                { method: AuthMid.getUserByEmail, assign: 'userByEmail' }
            ],
            description: 'Verify Email Exist',
            tags: ['api'],
            plugins: {
                'hapi-swagger': {
                    responses: { '400': { 'description': 'Bad Request' } },
                    payloadType: 'form'
                }
            }
        }
    });

    server.route({
        method: ['POST'],
        path: '/api/user/register',
        handler: AuthController.register,
        config: {
            validate: AuthVal.register,
            pre: [
                { method: AuthMid.getUserByEmail, assign: 'userByEmail' }
            ],
            description: 'User Register',
            tags: ['api'],
            plugins: {
                'hapi-swagger': {
                    responses: { '400': { 'description': 'Bad Request' } },
                    payloadType: 'form'
                }
            }
        }
    });

    server.route({
        method: ['GET'],
        path: '/api/user/active',
        handler: AuthController.active,
        config: {
            validate: AuthVal.active,
            description: 'Active User',
            tags: ['api'],
            plugins: {
                'hapi-swagger': {
                    responses: { '400': { 'description': 'Bad Request' } },
                    payloadType: 'form'
                }
            },
        }
    });

    server.route({
        method: 'POST',
        path: '/api/user/login',
        handler: AuthController.login,
        config: {
            validate: AuthVal.login,
            description: 'User Login',
            tags: ['api'],
            plugins: {
                'hapi-swagger': {
                    responses: { '400': { 'description': 'Bad Request' } },
                    payloadType: 'form'
                }
            },
        }
    });

    server.route({
        method: 'POST',
        path: '/api/user/facebook-login',
        handler: AuthController.facebookLogin
    });

    server.route({
        method: 'POST',
        path: '/api/user/google-login',
        handler: AuthController.googleLogin
    });

    server.route({
        method: ['GET'],
        path: '/api/user/logout',
        handler: AuthController.logout,
        config: {
            auth: 'jwt',
        }
    });

    server.route({
        method: ['POST'],
        path: '/api/user/forgot',
        handler: AuthController.forgot,
        config: {
            validate: AuthVal.forgot,
            description: 'Forgot Password',
            tags: ['api'],
            plugins: {
                'hapi-swagger': {
                    responses: { '400': { 'description': 'Bad Request' } },
                    payloadType: 'form'
                }
            }
        }
    });

    server.route({
        method: 'POST',
        path: '/api/user/reset',
        handler: AuthController.reset,
        config: {
            validate: AuthVal.reset,
            description: 'Reset Password',
            tags: ['api'],
            plugins: {
                'hapi-swagger': {
                    responses: { '400': { 'description': 'Bad Request' } },
                    payloadType: 'form'
                }
            }
        }
    });

    server.route({
        method: ['POST'],
        path: '/api/user/changepassword',
        handler: AuthController.changepassword,
        config: {
            auth: {
                strategy: 'jwt',
                scope: ['user', 'admin']
            },
            validate: AuthVal.changepassword,
            description: 'Change Password',
            tags: ['api'],
            plugins: {
                'hapi-swagger': {
                    responses: { '400': { 'description': 'Bad Request' } },
                    payloadType: 'form'
                }
            }
        }
    });

    server.route({
        method: ['GET'],
        path: '/api/user/account',
        handler: AuthController.account,
        config: {
            pre: [
                { method: AuthMid.getAuthUser, assign: 'user' }
            ],
            auth: {
                strategy: 'jwt',
                scope: ['user', 'admin']
            }
        }
    });

    server.route({
        method: ['GET'],
        path: '/api/user/profile/{id}',
        handler: AuthController.profile,
        config: {
            pre: [
                { method: AuthMid.getAuthUser, assign: 'user' }
            ],
            auth: 'jwt'
        }

    });

    server.route({
        method: 'POST',
        path: '/api/user/uploadavatar',
        handler: AuthController.uploadavatar,
        config: {
            pre: [
                { method: AuthMid.getAuthUser, assign: 'user' }
            ],
            auth: 'jwt'
        }
    });


    server.route({
        method: 'POST',
        path: '/api/user/update',
        handler: AuthController.update,
        config: {
            validate: AuthVal.update,
            pre: [{
                method: (request, h) => {
                    let { UserMiddleware } = request.server.plugins['user'];
                    return UserMiddleware.authUser(request, h);
                },
                assign: 'user'
            }],
            auth: 'jwt',
            description: 'Update User Profile',
            tags: ['api'],
            plugins: {
                'hapi-swagger': {
                    responses: { '400': { 'description': 'Bad Request' } },
                    payloadType: 'form'
                }
            }
        }
    });

    server.route({
        method: ['GET'],
        path: '/api/user/verify-login',
        handler: AuthController.verifyLogin,
        config: {
            pre: [
                { method: AuthMid.getAuthUser, assign: 'user' }
            ],
            auth: 'jwt'
        }
    });

    AuthMid.initAdminUser(server);
};

exports.register.attributes = {
    name: 'user'
};
