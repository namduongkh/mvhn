"use strict";

var Joi = require('joi');

const userVal = {
    verifyemail: {
        payload: {
            email: Joi.string().email().required().description('Email')
        }
    },
    registerEvent: {
        payload: {
            phone: Joi.string().required().description('Phone'),
        }
    },
    register: {
        payload: {
            name: Joi.string().required().description('Name'),
            email: Joi.string().email().required().description('Email'),
            phone: Joi.string().required().description('Phone'),
            password: Joi.string().min(5).required().description('Password'),
            cfpassword: Joi.string().min(5).required().description('Confirm Password'),
            address: Joi.string().allow('').description('address'),
            province: Joi.number().allow('').description('province'),
        }
    },
    login: {
        payload: {
            email: Joi.string().email().required().description('Email'),
            password: Joi.string().required().description('Password'),
            scope: Joi.string().description('Scope'),
        }
    },
    forgot: {
        payload: {
            email: Joi.string().email().required().description('Email')
        }
    },
    active: {
        query: {
            token: Joi.string().required().description('Token'),
        }
    },
    reset: {
        payload: {
            token: Joi.string().required().description('Token'),
            newPassword: Joi.string().required().description('New Password'),
            confirmNewPassword: Joi.string().required().description('Confirm Password')
        },
    },
    changepassword: {
        payload: {
            currentPassword: Joi.string().required().description('Current Password'),
            newPassword: Joi.string().required().description('New Password'),
            confirmNewPassword: Joi.string().required().description('Confirm Password')
        }
    },
    update: {
        payload: {
            _id: Joi.any().description('Id'),
            email: Joi.string().description('email'),
            name: Joi.string().description('Name'),
            phone: Joi.string().description('Phone'),
            address: Joi.string().description('Address'),
            avatar: Joi.string().allow('', null).description('user avatar'),
        }
    }
};
module.exports = userVal;