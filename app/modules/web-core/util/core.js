'use strict';
const mongoose = require('mongoose');
const _ = require('lodash');

module.exports = function(server) {
    var allow = [
        'www.bidy.vn',
        'fig.bidy.vn',
        'dev.bidy.vn',
        'fig-dev.bidy.vn',
        'localhost'
    ]
    return {
        allowCollection: function(hostname) {
            if (allow.indexOf(hostname) > -1) {
                return true;
            }
            return false;
        }
    };
};