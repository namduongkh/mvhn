var mongoose = require('mongoose'),
    Promise = require('bluebird'),
    crypto = require('crypto'),
    JWT = require('jsonwebtoken'),
    aguid = require('aguid'),
    _ = require('lodash'),
    bcrypt = Promise.promisifyAll(require('bcrypt'));

const UserGroup = mongoose.model('UserGroup');
const User = mongoose.model('User');

const SALT_LENGTH = 9;

class Auth {
    constructor(server) {
        this.server = server;
        // this.redisClient = server.redis;
        this.configManager = server.configManager;
    }
    hashPassword(password) {
        return bcrypt.hashAsync(password, SALT_LENGTH);
    }
    compare(plainPassword, hashPassword) {
        return bcrypt.compareAsync(plainPassword, hashPassword).then(valid => {
            if (valid) {
                return Promise.resolve(valid);
            }
            return Promise.reject(new Error('Mật khẩu không đúng'));
        });
    }
    saveSession(session) {
        // this.redisClient.set(session.id, JSON.stringify(session));
        return session;
    }
    invalidSession(sessionId) {
        // return this.redisClient.getAsync(sessionId)
        //     .then((result) => {
        //         let session = result ? JSON.parse(result) : {};
        //         if (!session.id) {
        //             return Promise.reject(new Error('Invalid session data'));
        //         }
        //         session.valid = false;
        //         session.ended = new Date().getTime();
        //         return this.saveSession(session);
        //     });
        let that = this;
        return new Promise(function (rs, rj) {
            rs(that.saveSession({ valid: false, ended: new Date().getTime() }));
        });
    }
    login(email, password, user) {
        return this.compare(password, user.password)
            .then(valid => {
                return this.createSession(user)
            })
            .then(session => {
                return this.saveSession(session);
            })
            .then(session => {
                return this.createJwtToken(session);
            });
    }
    loginWithoutPass(email, user) {
        return this.createSession(user)
            .then(session => {
                return this.saveSession(session);
            })
            .then(session => {
                return this.createJwtToken(session);
            });
    }
    initGuest(guest) {
        return this.createSession(guest)
            .then(session => {
                return this.saveSession(session);
            })
            .then(session => {
                return this.createJwtToken(session);
            });
    }
    logout(sessionId) {
        return this.invalidSession(sessionId);
    }
    getRandomString(length = 20) {
        return crypto.randomBytes(length).toString('hex');
    }
    getAuthUser(request) {
        const id = request.auth.credentials.uid;
        User
            .findOne({ _id: id })
            .exec()
            .then(function (user) {
                if (!user) {
                    return Promise.reject(new Error('Auth User is not found.'));
                }
                return user;
            });
    }
    async createSession(user) {
        let configManager = this.configManager;
        let cmsName = configManager.get('web.name');
        var userSession = {};
        var defaultSession = {
            valid: true,
            id: cmsName + ':Users:' + aguid(),
            uid: '',
            name: 'guest',
            scope: ['guest'],
            exp: new Date().getTime() + 30 * 60 * 1000
        };

        if (user && user._id) {
            userSession = {
                uid: user._id ? user._id.toString() : '',
                name: user.name,
                scope: user.roles,
                accessItself: await user.accessItself()
            }
        }

        return Promise.resolve(_.merge(defaultSession, userSession));
    }
    createJwtToken(session) {
        const secret = this.configManager.get('web.jwt.secret');
        let jwtToken = JWT.sign(session, secret);

        if (session.uid) User.findByIdAndSaveAccessToken(session.uid, jwtToken);

        return jwtToken;
    }
}

module.exports = Auth;
