'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    bcrypt = require('bcrypt'),
    Schema = mongoose.Schema,
    moment = require('moment'),
    _ = require('lodash');

const SALT_LENGTH = 9;
/**
 * A Validation function for local strategy properties
 */
var validateLocalStrategyProperty = function (property) {
    return ((this.provider !== 'local' && !this.updated) || property.length);
};

/**
 * A Validation function for local strategy password
 */
var validateLocalStrategyPassword = function (password) {
    return (this.provider !== 'local' || (password && password.length > 5));
};

/**
 * User Schema
 */
var UserSchema = new Schema({
    name: {
        type: String,
        trim: true,
        validate: [validateLocalStrategyProperty, 'Please fill in your name']
    },
    email: {
        type: String,
        trim: true,
        // default: '',
        unique: 'Email already exists',
        validate: [validateLocalStrategyProperty, 'Please fill in your email'],
        match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },
    username: {
        type: String,
        trim: true,
        unique: 'Username already exists'
    },
    phone: {
        type: String,
        match: [/\d+/, 'Please fill a valid phone number']
    },
    status: {
        type: Number,
        default: 1
    },
    roles: {
        type: [{
            type: String,
            // enum: ['user', 'admin']
        }],
        default: ['user']
    },
    address: {
        type: String
    },
    province: {
        type: String,
        ref: 'Province'
    },
    district: {
        type: Schema.ObjectId,
        ref: 'District'
    },
    password: {
        type: String,
        // default: '',
        validate: [validateLocalStrategyPassword, 'Password should be longer']
    },
    accessToken: {
        type: String,
        default: '',
        trim: true,
    },
    activeToken: {
        type: String,
        default: '',
        trim: true,
    },
    activeExpires: {
        type: Date
    },
    // provider: {
    //     type: String,
    //     required: 'Provider is required'
    // },
    avatar: {
        type: String,
    },
    providerData: {},
    additionalProvidersData: {},
    /* For reset password */
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpires: {
        type: Date
    },
    lazyMode: {
        type: Boolean,
        default: false
    },
    point: {
        type: Number,
        default: 0
    },
    facebookId: { type: String },
    facebookAccessToken: { type: String },
    googleId: { type: String }
}, { collection: 'users', timestamps: true, usePushEach: true });

UserSchema.index({
    createdAt: 1,
    name: 1,
    email: 1
});

/**
 * Create instance method for hashing a password
 */
UserSchema.methods = {
    hashPassword: function (password, callback) {
        bcrypt.hash(password, SALT_LENGTH, callback);
    },
    authenticate: function (password, callback) {
        bcrypt.compare(password, this.password, callback);
    },
    accessItself: async function () {
        const UserGroup = mongoose.model('UserGroup');

        return (await UserGroup.count({ slug: { $in: this.roles }, accessItself: true })) > 0 &&
            (await UserGroup.count({ slug: { $in: this.roles }, accessItself: { $ne: true } })) == 0;
    },
    changePoint: async function (point, content = '', model = '', objectId = '') {
        const PointLog = mongoose.model('PointLog');

        this.point = this.point || 0;
        point = isNaN(point) ? 0 : Number(point);

        let newPoint = this.point + point;
        let log = new PointLog({
            user: this._id,
            point,
            content,
            model,
            objectId,
            before: this.point,
            after: newPoint,
        });

        log.save().then(() => {
            this.point = newPoint;
            this.save();
        });

        return log;
    },
    syncPoint: async function () {
        const PointLog = mongoose.model('PointLog');

        let result = await PointLog.aggregate([
            {
                $match: {
                    user: this._id
                }
            },
            {
                $project: {
                    user: 1,
                    total: { $sum: '$point' }
                }
            }
        ])

        if (result && result[0] && result[0].total) {
            this.point = result[0].total;
            await this.save();
        }
    }
};

UserSchema.statics = {
    findByIdAndSaveAccessToken: async function (id, token) {
        const User = mongoose.model('User');
        let user = await User.findById(id);
        user.accessToken = token;
        return await user.save();
    }
}

UserSchema.pre('save', function (next) {
    if (!this.username && this.email) {
        this.username = this.email;
    }
    return next();
});

UserSchema.methods.notify = async function (content = '') {
    const Conversation = mongoose.model('Conversation');
    let conversation = await Conversation.findOrCreateNotificationByUserId(this._id);
    return await conversation.sendMessage({
        content,
        type: 'notify'
    });
}

module.exports = mongoose.model('User', UserSchema);
