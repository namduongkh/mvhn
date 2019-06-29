'use strict';
import axios from "axios";
import _ from "lodash";
import mongoose from "mongoose";

const UserGroup = mongoose.model('UserGroup');
const UserRight = mongoose.model('UserRight');

exports.index = {
    handler: async function (request, h) {
        if (!request.auth.credentials || !request.auth.isAuthenticated || !(
            request.auth.credentials.uid && permitCms(request.auth.credentials.scope)
        )) {
            return h.view('cms/views/index', {}, {
                layout: 'cms/layout-login'
            });
        }

        return h.view('cms/views/index', {
            accessibles: await accessibles(request)
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

async function accessibles(request) {
    // let { scope } = request.auth.credentials;
    // let { server } = request;
    // let accessibles = [];
    // let routes = server.table();
    // for (let i in routes) {
    //     let route = routes[i];
    //     let { path, method, settings } = route;
    //     if (method == "get" && /^\/cms\/[^\/]+$/.test(path) && isAccessible(settings && settings.auth, scope)) {
    //         accessibles.push(settings.id.split(':')[1]);
    //     }
    // }
    // return accessibles;
    let { scope } = request.auth.credentials;
    let groups = await UserGroup.find({
        slug: { $in: scope }
    }, "allowedRights").lean();

    let rightIds = _.compact(_.map(groups, 'allowedRights'));
    let rights = await UserRight.find({
        _id: { $in: rightIds }
    }, "controller action").lean();

    rights = rights.map(right => { return `${right.controller}/${right.action}` });

    return rights;
}

function isAccessible(auth, scopes) {
    let routeScopes = auth && auth.access && auth.access[0] && auth.access[0].scope && auth.access[0].scope.selection || [];
    return _.intersection(scopes, routeScopes).length > 0;
}

function permitCms(userScope = []) {
    return _.intersection(userScope, ['admin']).length > 0;
}