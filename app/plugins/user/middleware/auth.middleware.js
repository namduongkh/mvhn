'use strict';

const mongoose = require('mongoose');
const User = mongoose.model('User');
const regexp = require('@root/app/utils/regexp');

/**
 * Middleware
 */
const getAuthUser = async (request, h) => {
  const id = request.auth.credentials.uid;
  if (!id) return h.response(false);

  try {
    let user = await User.findOne({ _id: id })
    return user;
  } catch (err) {
    return h.response(err);
  }
}

const getUserByEmail = (request, h) => {

  const email = request.payload.email;
  return User
    .findOne({ email: email })
    .exec()
    .then(function (user) {
      return h.response(user);
    }).catch(err => {
      request.log(['error'], err);
      return h.response(err);
    });
}

export default {
  getAuthUser,
  getUserByEmail
}
