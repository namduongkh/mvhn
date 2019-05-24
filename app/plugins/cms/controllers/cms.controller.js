'use strict';
import axios from "axios";

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

exports.login = {
    handler: function (request, h) {
        return h.view('cms/views/index', {}, {
            layout: 'cms/layout-login'
        });
    }
};

exports.fetchUrl = {
    handler: async function (request, h) {
        let url = request.query.url || (request.payload && request.payload.url);
        return axios.get(url).then((resp) => {
            return h.response(resp.data);
        });
    },
    auth: false
};
