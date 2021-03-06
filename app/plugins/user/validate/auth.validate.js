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
      username: Joi.string().required().description('Username'),
      email: Joi.string().required().description('Email'),
      phone: Joi.string().description('Phone'),
      password: Joi.string().min(6).required().description('Password'),
      cfpassword: Joi.string().min(6).required().description('Confirm Password'),
      address: Joi.string().allow('').description('Address'),
      province: Joi.number().allow('').description('Province'),
      lazyMode: Joi.boolean().description('Lazy Mode'),
    }
  },
  login: {
    payload: {
      email: Joi.string().required().description('Email'),
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
    }
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
      province: Joi.number().allow('').description('Province'),
      avatar: Joi.string().allow('', null).description('user avatar'),
      username: Joi.string().description('Username'),
      password: Joi.string().min(6).description('Password'),
      cfpassword: Joi.string().min(6).description('Confirm Password'),
      lazyMode: Joi.boolean().description('Lazy Mode'),
    }
  }
};
module.exports = userVal;
