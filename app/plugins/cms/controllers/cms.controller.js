'use strict';
import axios from "axios";
import _ from "lodash";

exports.index = {
    handler: function (request, h) {
        // if (!request.auth.credentials || !request.auth.isAuthenticated
        //     || !(request.auth.credentials.uid && (request.auth.credentials.scope.includes('admin')))) {
        if (!request.auth.credentials || !request.auth.isAuthenticated) {
            return h.view('cms/views/index', {}, {
                layout: 'cms/layout-login'
            });
        }

        return h.view('cms/views/index', {
            accessibles: accessibles(request)
        }, {
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

function accessibles(request) {
    let { scope } = request.auth.credentials;
    let { server } = request;
    let accessibles = [];
    let routes = server.table();
    for (let i in routes) {
        let route = routes[i];
        let { path, method, settings } = route;
        if (method == "get" && /^\/cms\/[^\/]+$/.test(path) && isAccessible(settings && settings.auth, scope)) {
            accessibles.push(path);
        }
    }
    return accessibles;
}

function isAccessible(auth, scopes) {
    let routeScopes = auth && auth.access && auth.access[0] && auth.access[0].scope && auth.access[0].scope.selection || [];
    return _.intersection(scopes, routeScopes).length > 0;
}