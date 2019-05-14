'use strict';

import Boom from 'boom';
import Joi from 'joi';
import mongoose from 'mongoose';
import moment from 'moment';
import async from 'async';
import _ from 'lodash';
import UserEmail from '../util/user-email';

const User = mongoose.model('User');
const ErrorHandler = require(BASE_PATH + '/app/utils/error.js');
// const base64 = require('base-64');

const index = (request, h) => {
    return h.response({ status: true, msg: 'It works' });
}

const verifyemail = (request, h) => {
    if (request.pre.userByEmail) {
        return h.response(Boom.badRequest('Email is exist'));
    }
    return h.response({ status: 1, message: 'Email is not exist' });
}

const register = async (request, h) => {
    // try {
    //     if (!request.state["browser_id"] || !base64.decode(request.state["browser_id"]).includes('browser_id:')) {
    //         let cookieOptions = request.server.configManager.get('web.cookieOptions');
    //         return h.response({ "statusCode": 400, "error": "Bad Request", "message": 'Phát hiện hoạt động đáng ngờ! Vui lòng thử lại.' })
    //             .code(400)
    //             .unstate('browser_id', cookieOptions);
    //     }
    // } catch (error) {
    //     let cookieOptions = request.server.configManager.get('web.cookieOptions');
    //     return h.response({ "statusCode": 400, "error": "Bad Request", "message": 'Phát hiện hoạt động đáng ngờ! Vui lòng thử lại.' })
    //         .code(400)
    //         .unstate('browser_id', cookieOptions);
    // }
    if (request.pre.userByEmail) {
        return h.response(Boom.badRequest('Email đã đăng ký trước đó'));
    }
    if (request.payload.password != request.payload.cfpassword) {
        return h.response(Boom.badRequest('Mật khẩu và xác nhận mật khẩu không tồn tại'));
    }
    let userByPhone = await User.findOne({ phone: request.payload.phone }, '_id').lean();
    if (userByPhone) {
        return h.response(Boom.badRequest('Số điện thoại đã được sử dụng cho một tài khoản khác'));
    }
    delete request.payload.cfpassword;
    request.payload.email = (String(request.payload.email)).toLowerCase();
    let user = new User(request.payload);
    user.provider = 'local';
    let auth = request.server.plugins['user'].auth;

    return auth
        .hashPassword(request.payload.password)
        .then(hash => {
            user.password = hash;
            const token = auth.getRandomString(20);
            user.activeToken = token;
            const promise = user.save();
            return promise;
        })
        // .then(user => {
        //     /*send email welcome*/
        //     // try {
        //     //     UserEmail.sendRegisterEmail(request, { name: user.name, address: user.email }, user);
        //     // }
        //     // catch (e) { }

        //     try {
        //         // Apply refer code to add point for refer user
        //         UserUtil.applyReferCode(request.payload.refered_code, user._id, request);
        //     }
        //     catch (ex) {
        //         request.log(['error', 'applyReferCode'], ex);
        //     }

        //     return user;
        // })
        .then(user => {
            user = user.toObject();
            return h.response(user);
        })
        .catch(err => {
            return h.response(Boom.badRequest(ErrorHandler.getErrorMessage(err)));
        });
}

const active = (request, h) => {
    let token = request.query.token;
    let promise = User.findOne({ activeToken: token }).exec();
    return promise
        .then(user => {
            if (!user) {
                return h.response(Boom.badRequest('Invalid Token'));
            }
            user.activeToken = '';
            user.status = 1;
            return user.save();
        })
        .then(user => {
            return h.response({ status: 1 });
        })
        .catch(err => {
            request.log(['error', 'active'], err);
            return h.response(Boom.badRequest(ErrorHandler.getErrorMessage(err)));
        });
}

const login = (request, h) => {
    let configManager = request.server.configManager;
    let cookieOptions = configManager.get('web.cookieOptions');

    let { email, password, scope } = request.payload;
    email = email.toLowerCase();
    let promise = User.findOne({ email: new RegExp(email, 'i') }).exec();

    return promise
        .then(user => {
            if (!user || (user && user.status !== 1)) {
                return h.response(Boom.unauthorized("Tài khoản không tồn tại hoặc đã bị khóa"));
            }

            /*check scope if exist*/
            if (scope && !user.roles.includes(scope)) {
                return h.response(Boom.unauthorized("Bạn không có quyền với thao tác này"));
            }
            return request.server.plugins['user'].auth
                .login(email, password, user)
                .then(async (jwtToken) => {
                    return h.response({ token: jwtToken })
                        .header("Authorization", jwtToken)
                        .state(COOKIE_NAME, jwtToken, cookieOptions);
                })
                .catch(err => {
                    console.log('1 error login', err);
                    request.log(['error', 'login'], err);
                    return h.response(Boom.unauthorized("Mật khẩu hoặc tài khoản không đúng."));
                });

        })
        .catch(err => {
            console.log('2 error login', err);
            return h.response(Boom.unauthorized("Lỗi máy chủ. Vui lòng thử lại sau"));
            // return h.response(Boom.badRequest(ErrorHandler.getErrorMessage(err)));
        });
}

const facebookLogin = (request, h) => {
    let payload = request.payload;
    let configManager = request.server.configManager;
    let cookieOptions = configManager.get('web.cookieOptions');
    // console.log('login facebook', payload);
    if (payload.email) {
        return User.findOne({
            email: payload.email
        })
            .lean()
            .then((user) => {
                if (user) {
                    return user;
                } else {
                    return new Promise((rs, rj) => {
                        async.parallel({
                            district: (cb) => {
                                if (payload.location && payload.location.name) {
                                    District.findOne({
                                        name: new RegExp(payload.location.name, 'gi')
                                    }, "province")
                                        .lean()
                                        .then((district = {}) => {
                                            return cb(null, district);
                                        });
                                } else {
                                    cb(null, {});
                                }
                            },
                        }, (err, results) => {
                            let newUser = new User({
                                name: payload.name || 'No name',
                                email: payload.email,
                                province: results.district.province,
                                district: results.district._id,
                                address: payload.address,
                                provider: 'local'
                            });
                            rs(newUser.save());
                        });
                    });
                }
            })
            .then((user) => {
                return request.server.plugins['user'].auth
                    .loginWithoutPass(user.email, user)
                    .then(jwtToken => {
                        return h.response({ token: jwtToken })
                            .header("Authorization", jwtToken)
                            .state(COOKIE_NAME, jwtToken, cookieOptions);
                    })
                    .catch(err => {
                        request.log(['error', 'login'], err);
                        return h.response(Boom.unauthorized("Incorrect email or password"));
                    });
            });
    } else {
        return h.response(Boom.badRequest('Không có email!'));
    }
}

const googleLogin = (request, h) => {
    return h.response();
}

const logout = async (request, h) => {
    var configManager = request.server.configManager;
    const sessionId = request.auth.credentials.id;
    let auth = request.server.plugins['user'].auth;
    let token = await auth.initGuest({});
    return auth
        .logout(sessionId)
        .then((session) => {
            let cookieOptions = request.server.configManager.get('web.cookieOptions');
            return h.response({ status: true }).header("Authorization", '')
                .unstate(COOKIE_NAME, cookieOptions);
            // .unstate('browser_id', cookieOptions);
        })
        .catch(err => {
            console.log(err);
            return h.response(Boom.badRequest(ErrorHandler.getErrorMessage(err)));
        })

}

const forgot = (request, h) => {
    const email = request.payload.email;
    const promise = User.findOne({ email: email }, '-password').exec();
    let auth = request.server.plugins['user'].auth;
    var configManager = request.server.configManager;
    let webUrl = configManager.get('web.context.settings.services.webUrl')
    return promise
        .then(user => {
            if (!user) {
                return h.response(Boom.notFound('Email không tồn tại'));
            }
            const token = auth.getRandomString(20);
            user.resetPasswordToken = token;
            user.resetPasswordExpires = Date.now() + 48 * 3600000; // 48 hours
            return user.save();
        })
        .then(async user => {
            let context = {
                name: user.name,
                email: user.email,
                url: `${webUrl}/dat-lai-mat-khau/${user.resetPasswordToken}`
            }
            UserEmail.sendForgotPasswordEmail(request, { name: user.name, address: user.email }, context);
            return h.response({ status: 1 });
        })
        .catch(err => {
            return h.response(Boom.badRequest(ErrorHandler.getErrorMessage(err)));
        });
}

const reset = (request, h) => {
    let { newPassword, confirmNewPassword, token } = request.payload;
    if (newPassword !== confirmNewPassword) {
        return h.response(Boom.badRequest('Xác nhận mật khẩu không khớp'));
    }
    if (!token) {
        return h.response(Boom.badRequest('Mã xác thực không hợp lệ'));
    }
    let auth = request.server.plugins['user'].auth;

    let promise = User.findOne({ resetPasswordToken: token }).exec();
    return promise
        .then(user => {
            if (!user) {
                throw (Boom.badRequest('Mã xác thực không hợp lệ'));
            }
            user.resetPasswordToken = '';
            user.resetPasswordExpires = null;
            return auth.hashPassword(newPassword).then(hash => {
                user.password = hash;
                return user.save();
            });
        })
        .then(user => {
            return h.response({ success: 1, message: 'Đặt lại mật khẩu thành công' });
        })
        .catch(err => {
            request.log(['error', 'reset'], err);
            return h.response(Boom.badRequest(ErrorHandler.getErrorMessage(err)));
        });
}

const changepassword = async (request, h) => {
    let user = await User.findById(request.auth.credentials.uid);
    if (!user) {
        return h.response(Boom.notFound('Tài khoản không tồn tại'));
    }
    let { currentPassword, newPassword, confirmNewPassword } = request.payload;
    /*validate new password and confirm password*/
    if (newPassword != confirmNewPassword) {
        return h.response(Boom.badRequest('Mật khẩu xác nhận không khớp'));
    }
    let auth = request.server.plugins['user'].auth;
    return auth
        .compare(currentPassword, user.password)
        .then(valid => {
            return auth.hashPassword(newPassword).then(hash => {
                user.password = hash;
                return user.save();
            });
        })
        .then(user => {
            return h.response({ status: 1, message: 'Thay đổi mật khẩu thành công' });
        })
        .catch(err => {
            let errorMessage = ErrorHandler.getErrorMessage(err);
            return h.response(Boom.badRequest(errorMessage));
        });

}

const account = (request, h) => {
    const user = request.pre.user;
    if (user) {
        return h.response(user);
    }
    throw (Boom.unauthorized('User is not found'));
};


const profile = (request, h) => {
    const user = request.pre.user;
    if (user) {
        return h.response(user);
    }
    throw (Boom.unauthorized('User is not found'));
}

const uploadavatar = (request, h) => {
    const user = request.pre.user;
    return h.response();
}

const update = (request, h) => {
    let user = request.pre.user;
    if (!user) {
        return h.response(Boom.notFound('User is not found'));
    }
    if (request.auth.credentials.uid !== user._id.toString()) {
        return h.response(Boom.unauthorized('What are you doing?'));
    }
    delete request.payload.total_points;
    user = _.extend(user, request.payload);

    return user
        .save()
        .then(async user => {
            let user_result = await User.findById(user._id, 'name email phone address province dob createdAt avatar').lean();
            return h.response({ status: 1, user: user_result });
        })
        .catch(err => {
            request.log(['error', 'update'], err);
            throw (Boom.badRequest(ErrorHandler.getErrorMessage(err)));
        })
}


const verifyLogin = (request, h) => {
    let user = request.pre.user;
    if (user) {
        user = JSON.parse(JSON.stringify(user));
        user.uid = user._id;
        user.scope = user.roles;
        return h.response(user);
    }
    throw Boom.unauthorized('User is not found');

}

export default {
    index,
    verifyemail,
    register,
    active,
    login,
    facebookLogin,
    googleLogin,
    logout,
    forgot,
    reset,
    changepassword,
    account,
    profile,
    uploadavatar,
    update,
    verifyLogin,
};
