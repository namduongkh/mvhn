'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var GoogleStrategy = require('passport-google-oauth20').Strategy;

// var _passportWindowslive = require('passport-windowslive');

var _passportFacebook = require('passport-facebook');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HapiPassport = function () {

  /**
   * Constructor
   * @param strategy
   * @param config
   */
  function HapiPassport(strategy, config) {
    _classCallCheck(this, HapiPassport);
    var scopeObj = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var advanced = typeof scopeObj !== 'undefined' && scopeObj.hasOwnProperty('scope') && Array.isArray(scopeObj.scope);
    if (strategy === 'GoogleStrategy') {
      this._provider = 'google';
      _passport2.default.use(new GoogleStrategy(config, function (accessToken, refreshToken, profile, done) {
        done(null, { accessToken, refreshToken, profile: (advanced ? profile : profile.emails[0].value) });
      }));
    } else if (strategy === 'OutlookStrategy') {
      this._provider = 'windowslive';
      _passport2.default.use(new _passportWindowslive.Strategy(config, function (accessToken, refreshToken, profile, done) {
        done(null, { accessToken, refreshToken, profile: (advanced ? profile : profile.emails[0].value) });
      }));
    } else if (strategy === 'FacebookStrategy') {
      this._provider = 'facebook';
      _passport2.default.use(new _passportFacebook.Strategy(config, function (accessToken, refreshToken, profile, done) {
        done(null, { accessToken, refreshToken, profile: (advanced ? profile : profile.id) });
      }));
    }
    _passport2.default.serializeUser(function (user, cb) {
      cb(null, user);
    });
    _passport2.default.deserializeUser(function (obj, cb) {
      cb(null, obj);
    });
    this._strategy = strategy;
    this._scope = scopeObj && scopeObj.scope;
  }

  _createClass(HapiPassport, [{
    key: 'authenticate',
    value: function authenticate(req, callback) {
      var res = {
        setHeader: function setHeader(data, url) {
          callback(url);
        },
        end: function end() {
          callback(null);
        }
      };
      if (this._strategy === 'GoogleStrategy') {
        _passport2.default.authenticate('google', { scope: this._scope || ['profile', 'email'] }).call(this, req, res, function () { });
      } else if (this._strategy === 'OutlookStrategy') {
        _passport2.default.authenticate('windowslive', { scope: this._scope || ['wl.signin', 'wl.basic', 'wl.emails'] }).call(this, req, res, function () { });
      } else if (this._strategy === 'FacebookStrategy') {
        _passport2.default.authenticate('facebook', { scope: this._scope || [] }).call(this, req, res, function () { });
      }
    }
  }, {
    key: 'authenticateCallBack',
    value: function authenticateCallBack(req, callback) {
      var request = {
        query: req.query,
        logIn: function logIn(email) {
          return callback(null, email);
        }
      };
      _passport2.default.authenticate(this._provider, {}).call(this, request, {}, function (err) {
        if (err) {
          callback(err);
        }
      });
    }
  }]);

  return HapiPassport;
}();

exports.default = HapiPassport;
