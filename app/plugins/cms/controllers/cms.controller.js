'use strict';
import axios from "axios";
import _ from "lodash";
import mongoose from "mongoose";
import PermitService from "../services/permit_service";

const UserGroup = mongoose.model('UserGroup');
const UserRight = mongoose.model('UserRight');
const Setting = mongoose.model('Setting');

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
            accessibles: await accessibles(request),
            allowedPostTypes: await getPostTypeConfig()
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
    },
    auth: false
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
    try {
        let { scope } = request.auth.credentials;
        return await PermitService.accessibles(scope);
    } catch (error) {
        console.log(error);
    }
}

// function isAccessible(auth, scopes) {
//     let routeScopes = auth && auth.access && auth.access[0] && auth.access[0].scope && auth.access[0].scope.selection || [];
//     return _.intersection(scopes, routeScopes).length > 0;
// }

function permitCms(userScope = []) {
    return true;
    // return _.intersection(userScope, ['admin']).length > 0;
}

async function getPostTypeConfig() {
    let setting = await Setting.findOne({ key: 'post_type' }).lean() || {};
    let object = {};
    setting.allowedTypes.forEach(type => {
        object[type] = {};

        Setting.POST_TYPE_ADDITIONAL_CONFIG.forEach(config => {
            object[type][config.key] = setting[`${type}${_.upperFirst(config.key)}`];
        })
    });

    return object;
}
