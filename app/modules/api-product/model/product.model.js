'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const SALT_LENGTH = 9;

var UserSchema = new Schema({
    title: {
        type: String,
        trim: true,
    },
    slug: {
        type: String,
        trim: true,
        unique: true
    },
    price: {
        type: Number,
    },
    image: {
        type: String,
        trim: true,
    },
    banner: {
        type: String,
        trim: true,
    },
    share_image: [{
        type: String,
        trim: true,
    }],
    intro: {
        type: String,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    gallery: [{
        type: String,
        trim: true,
    }],
    created: {
        type: Date,
        default: Date.now
    },
    shortId: {
        type: String,
        trim: true,
        unique: true
    }
}, {
    collection: 'products'
});

UserSchema.index({
    slug: 1
});

module.exports = mongoose.model('Product', UserSchema);