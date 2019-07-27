import _ from 'lodash';
// const base64 = require('base-64');
// const utf8 = require('utf8');
import ApplicationHelper from "../../../utils/application_helper";
import mongoose from "mongoose";

// const Category = mongoose.model('Category');
// const Setting = mongoose.model('Setting');

// exports.getCredentials = function (request, h) {
//     // Get the response object
//     let response = request.response;
//     // console.log(response);
//     // Check to see if the response is a view
//     if (response.variety === 'view') {
//         let config = request.server.configManager;
//         if (_.isEmpty(response.source.context)) {
//             response.source.context = {};
//         }
//         if (_.isEmpty(response.source.context.credentials)) {
//             response.source.context.credentials = {};
//         }
//         let credentials = request.auth.credentials;
//         // check roles to post collection
//         if (credentials) {
//             response.source.context.credentials = credentials;
//         }
//         response.source.context = _.merge(response.source.context, ApplicationHelper)
//     }
//     return h.continue;
// };

// exports.getCategories = async function (request, h) {
//     const Property = mongoose.model('Property');
//     let response = request.response;
//     if (response.variety === 'view') {
//         let categories = await Property.find({
//             type: 'category',
//             status: 1
//         }, "name slug color textClassname").lean();
//         response.source.context = _.merge(response.source.context, { categories })
//     }
//     return h.continue;
// };

// exports.getSticker = function(request, h) {
//     // Get the response object
//     let response = request.response;
//     // console.log(response);
//     // Check to see if the response is a view
//     if (response.variety === 'view') {
//         Sticker
//             .find()
//             .select("key file_name category")
//             .populate("category", "name")
//             .lean()
//             .then(function(result) {
//                 var key = [];
//                 var file_name = [];
//                 var category = [];
//                 var category_key = [];
//                 for (var i in result) {
//                     if (category.indexOf(result[i].category.name) == -1) {
//                         category.push(result[i].category.name);
//                     }
//                     key.push(result[i].key);
//                     file_name.push(result[i].file_name);
//                     category_key.push(result[i].category.name);
//                 }
//                 response.source.context.sticker = {
//                     key: key,
//                     category: category,
//                     category_key: category_key,
//                     file_name: file_name
//                 };
//                 h.continue;
//             })
//     }

// };

// exports.getSocialInfo = function(request, h) {
//     let response = request.response;
//     if (response.variety === 'view') {
//         let config = request.server.configManager;
//         let facebook = config.get('web.facebook');
//         let google = config.get('web.google');
//         response.source.context.social_info = {
//             facebook: {
//                 appId: facebook.appId,
//                 redirectUri: facebook.redirectUri
//             },
//             google: {
//                 apiKey: google.apiKey,
//                 clientId: google.clientId
//             },
//         }
//     }
//     h.continue;
// };

// exports.getHostInfo = function(request, h) {
//     let response = request.response;
//     if (response.variety === 'view') {
//         const hostInfo = request.info;
//         response.source.context.hostInfo = hostInfo;
//         var { allowCollection } = request.server.plugins['web-core'];
//         response.source.context.allowCollection = allowCollection(request.info.hostname);
//     }
//     h.continue;
// };

// exports.getGACode = function(request, h) {
//     let response = request.response;
//     if (response.variety === 'view') {
//         const hostname = request.info.hostname;
//         let config = request.server.configManager;
//         switch (hostname) {
//             case 'fig.bidy.vn':
//                 let gaCode = config.get('web.context.gaCodeFG');
//                 response.source.context.gaCode = gaCode;
//                 break;
//             default:
//                 break;
//         }
//     }
//     h.continue;
// };


// exports.getPostCategories = function(request, h) {
//     let promise = Category.find({
//         status: 1,
//         type: 'post'
//     });
//     promise.then(function(postCategories) {
//         let response = request.response;
//         // Check to see if the response is a view
//         if (response.variety === 'view') {
//             response.source.context.postCategories = postCategories;
//         }
//         h.continue;
//     });
// };


// exports.getProductCategories = function(request, h) {
//     let promise = Category.find({
//         status: 1,
//         type: 'product'
//     });
//     promise.then(function(productCategories) {
//         let response = request.response;
//         // Check to see if the response is a view
//         if (response.variety === 'view') {
//             response.source.context.productCategories = productCategories;
//         }
//         h.continue;
//     });
// };

// exports.getMeta = function (request, h) {
//     let response = request.response;
//     if (response.variety === 'view') {
//         let config = request.server.configManager;
//         let app = config.get('web.context.meta');
//         if (response.source.context.meta) {
//             let description = response.source.context.meta.description;
//             if (response.source.context.meta.title) {
//                 response.source.context.meta.title = response.source.context.meta.title + ' - ' + app.title;
//             } else {
//                 response.source.context.meta.title = app.title;
//             }
//             if (description) {
//                 response.source.context.meta.description = response.source.context.meta.description;
//             } else {
//                 response.source.context.meta.description = app.description;
//             }
//         } else {
//             response.source.context.meta = app
//         }
//         response.source.context.canonical = config.get('web.context.settings.services.webUrl') + request.url.href;
//     }
//     return h.continue;
// };

// exports.getMetaImage = function(request, h) {
//     let config = request.server.configManager;
//     let response = request.response;
//     if (response.variety === 'view') {
//         if (!response.source.context.meta.image) {
//             response.source.context.meta.image = config.get('web.settings.services.webUrl') + config.get('web.context.meta.image');
//         }
//     }
//     return h.continue;
// };


// var getStickerApi = [
//     '/suu-tap',
//     '/san-pham',
//     '/thong-tin-tai-khoan',
//     '/bo-suu-tap/'
// ];
// exports.getSticker = function(request, h) {
//     var {
//         mongoCache
//     } = request.server.plugins['web-core'];
//     let config = request.server.configManager;
//     let response = request.response;
//     if (response.variety === 'view') {
//         var { href } = request.url;
//         var allowGetSticker = false;
//         for (var i in getStickerApi) {
//             if (href.search(getStickerApi[i]) > -1) {
//                 allowGetSticker = true;
//                 break;
//             }
//         }
//         if (!response.source.context.sticker && allowGetSticker) {
//             // console.log("Href", href);
//             mongoCache.getSticker().then(function(result) {
//                     response.source.context.sticker = result;
//                     return h.continue;
//                 })
//                 .catch(function(err) {
//                     return h.continue;
//                 });
//         } else {
//             return h.continue;
//         }
//     } else {
//         return h.continue;
//     }
// };


exports.handleError = async (request, h) => {
    const response = request.response;
    if (!response.isBoom) {
        return h.continue;
    }
    let config = request.server.configManager;
    let loginUrl = config.get('web.error.user.login');

    const error = response;

    const statusCode = error.output.statusCode;

    if (['app-static'].includes(request.route.realm.plugin)) {
        return h.continue;
    }

    if (statusCode === 404) {
        request.log(['error', 'notfound'], 'Resources is not be found');
        return h.view('core/views/404', await getContext(request)).code(404);
    } else if (statusCode === 403) {
        request.log(['error', 'permission'], 'You have not permission to access this page');
        if (request.auth && request.auth.credentials && request.auth.credentials.uid) {
            return h.continue;
        } else {
            return h.redirect(loginUrl);
        }
    } else if (statusCode === 401) {
        request.log(['error', 'permission'], 'Missing authentication');
        return h.redirect(loginUrl);
    } else if (statusCode === 400) {
        return h.continue;
        // request.log(['error', 'badrequest'], 'Bad request');
        // return h.redirect(notFoundUrl);
    } else {
        return h.continue;
    }
};

exports.notFound = {
    handler: function (request, h) {
        return h.view('core/views/404', {
            meta: {
                title: "404 Not Found"
            }
        })
    }
};

exports.postHandlerContext = async function (request, h) {
    let response = request.response;
    if (response.variety === 'view') {
        response.source.context = await getContext(request);
    }
    return h.continue;
};

async function getContext(request) {
    let response = request.response;
    let context = (response && response.source && response.source.context) || {};
    let config = request.server.configManager;

    // Get assets
    context = _.merge(context, request.server.plugins['app-static'].getAssets());

    // Get credentials
    context.credentials = request.auth.credentials || {};
    context = _.merge(context, ApplicationHelper);

    if (!['cms'].includes(request.route.realm.plugin)) {
        context = _.merge(context, await webContext(request));
    }

    // Get meta data
    let app = config.get('web.context.meta');
    if (context.meta) {
        let description = context.meta.description;
        if (context.meta.title) {
            context.meta.title = context.meta.title + ' - ' + app.title;
        } else {
            context.meta.title = app.title;
        }
        if (description) {
            context.meta.description = context.meta.description;
        } else {
            context.meta.description = app.description;
        }
    } else {
        context.meta = app
    }
    context.canonical = config.get('web.context.settings.services.webUrl') + request.url.href;

    return context;
}

async function webContext(request) {
    const Property = mongoose.model('Property');
    const Post = mongoose.model('Post');

    // Get categories
    let categoryIds = _.map(await Post.aggregate([{ $unwind: "$category" }, { $sortByCount: "$category" }]), '_id');
    let categories = await Property.find({
        type: 'category',
        _id: { $in: categoryIds },
        status: 1
    }, "name slug color textClassname")
        .lean();

    // Get tags
    let tagIds = _.map(await Post.aggregate([{ $unwind: "$tags" }, { $sortByCount: "$tags" }]), '_id');
    let tags = await Property.find({
        type: 'tag',
        _id: { $in: tagIds },
        status: 1
    }, "name slug color textClassname")
        .limit(20)
        .lean();

    return {
        tags,
        categories
    };
}
