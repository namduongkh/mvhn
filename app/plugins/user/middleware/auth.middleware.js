'use strict';

const mongoose = require('mongoose');
const User = mongoose.model('User');
const regexp = require(BASE_PATH + '/app/utils/regexp');

/**
 * Middleware
 */
const getAuthUser = async (request, h) => {
  const id = request.auth.credentials.uid;
  // console.log(request.auth.credentials);
  // console.log("ID: " + id);
  // request.log(['info', 'auth'], id);
  try {
    let user = await User
      .findOne({ _id: id })
      .select('name roles provider status email created');
    return user;
  } catch (error) {
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

const initAdminUser = async (server) => {
  let _admin = await User.findOne({ email: 'admin@admin.com' }).lean();
  if (_admin && _admin._id) {
    return;
  }
  let auth = server.plugins['user'].auth;
  let admin = new User({
    email: 'admin@admin.com',
    provider: 'local',
    roles: ['admin', 'user']
  });
  auth.hashPassword('Qwerty123!')
    .then(hash => {
      admin.password = hash;
      const token = auth.getRandomString(20);
      admin.activeToken = token;
      const promise = admin.save();
      console.log("Init admin user")
      return promise;
    })
}

export default {
  getAuthUser,
  getUserByEmail,
  initAdminUser
}