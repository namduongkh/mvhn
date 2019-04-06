'use strict';
import Glob from 'glob';
import fs from "fs";

exports.index = {
    handler: function (request, h) {
        return h.view('cms/views/index', {}, {
            layout: 'cms/layout'
        });
    },
    auth: false
};
