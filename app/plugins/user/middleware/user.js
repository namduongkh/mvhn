'use strict';

const mongoose = require('mongoose');
const User = mongoose.model('User');
const regexp = require(BASE_PATH + '/app/utils/regexp');

export default class UserMiddleware {
    constructor(server) {
        this.server = server;
    }

    authUser(request, h, options = {}) {
        function getUser(id, options = {}) {
            let promise = User
                .findOne({ _id: id });
            // .select('name roles provider status email created total_points is_pregnant baby_dob estimate_baby_dob antenatals sms_antenatal')
            if (options.populates && Array.isArray(options.populates)) {
                options.populates.forEach((populate) => {
                    promise = promise.populate(...populate);
                });
            }
            if (options.select) {
                promise = promise.select(options.select);
            }
            // if (options.lean) {
            //     return promise.lean()
            // } else {
            return promise.exec()
            // }
        }
        request.payload = request.payload || {};
        let userIdDebug = request.payload.userIdDebug || request.query.userIdDebug;
        if (userIdDebug) {
            const id = userIdDebug;
            getUser(id, options)
                .then(function (user) {
                    return h.response(user);
                })
                .catch(err => {
                    console.log(err);
                    return h.response(null);
                });
        } else {
            if (!request.auth.credentials || request.auth.credentials.name == 'guest') {
                return h.response(null);
            } else {
                const id = request.auth.credentials.uid;
                getUser(id, options)
                    .then(function (user) {
                        return h.response(user);
                    })
                    .catch(err => {
                        console.log(err);
                        return h.response(null);
                    });
            }
        }
    }

    async get(request, h) {
        let userId = request.payload.userId;
        try {
            let user = await User.findOne({ _id: userId });
            return h.response(user);
        } catch (error) {
            return h.response();
        }
    }
}