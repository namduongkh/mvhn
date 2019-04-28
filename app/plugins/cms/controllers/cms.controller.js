'use strict';
import Glob from 'glob';
import fs from "fs";

exports.index = {
    handler: function (request, h) {
        if (!request.auth.credentials || !request.auth.isAuthenticated
            || !(request.auth.credentials.uid && (request.auth.credentials.scope.includes('admin')))) {

            return h.view('cms/views/index', {}, {
                layout: 'cms/layout-login'
            });
        }

        return h.view('cms/views/index', {}, {
            layout: 'cms/layout'
        });
    },
    auth: {
        strategy: 'jwt'
    }
};
