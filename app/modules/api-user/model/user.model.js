'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcryptjs');

const SALT_LENGTH = 9;

var UserSchema = new Schema({
    name: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
        unique: true
    },
    password: {
        type: String,
        // validate: [validateLocalStrategyPassword, 'Password should be longer']
    },
    roles: {
        type: [{
            type: String,
            enum: ['superadmin', 'user', 'admin', 'seller', 'collector']
        }],
        default: ['user']
    },
    created: {
        type: Date,
        default: Date.now
    },
}, {
    collection: 'users'
});


/**
 * Create instance method for hashing a password
 */
UserSchema.methods = {
    hashPassword: function(password, callback) {
        bcrypt.hash(password, SALT_LENGTH, callback);
    },
    authenticate: function(password, callback) {
        bcrypt.compare(password, this.password, callback);
    }

}

UserSchema.index({
    slug: 1
});

module.exports = mongoose.model('User', UserSchema);