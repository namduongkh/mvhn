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
    phone: {
        type: String,
        unique: 'Phone already exists',
        match: [/\d+/, 'Please fill a valid phone number']
    },
    status: {
        type: Number,
        default: 1
    },
    roles: {
        type: [{
            type: String,
            enum: ['user', 'admin']
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
    activeToken: {
        type: String,
        default: '',
        trim: true,
    },
    activeExpires: {
        type: Date
    },
    provider: {
        type: String,
        required: 'Provider is required'
    },
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
    }
}, { collection: 'users', timestamps: true, usePushEach: true });

UserSchema.index({
    createdAt: 1,
    name: 1,
    email: 1,
    phone: 1
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
    }
};

module.exports = mongoose.model('User', UserSchema);
