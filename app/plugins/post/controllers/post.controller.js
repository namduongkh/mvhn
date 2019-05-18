'use strict';
import mongoose from "mongoose";
import Boom from "boom";
const Post = mongoose.model('Post');
import PostHelper from "../helpers/post.helper";
import CmsPostsController from "./cms_posts.controller";

exports.index = {
    handler: async function (request, h) {
        let posts = await Post.find({
            status: 1
        }, 'title slug category createdAt thumb')
            .sort("-createdAt")
            .populate('category', 'name slug color textClassname')
            .limit(20)
            .lean();

        let featuredPosts = await Post.find({
            status: 1
        }, 'title slug category createdAt thumb')
            .sort("-featured -createdAt")
            .populate('category', 'name slug color textClassname')
            .limit(8)
            .lean();

        let mostReadPosts = await Post.find({
            status: 1
        }, 'title slug category createdAt thumb')
            .sort("-views -createdAt")
            .populate('category', 'name slug color textClassname')
            .limit(10)
            .lean();

        return h.view('post/views/index', { posts, featuredPosts, mostReadPosts });
    }
};

// exports.new = {
//     handler: (request, h) => {
//         return h.view('post/views/new', {
//             meta: {
//                 title: "New Post"
//             }
//         });
//     }
// };

// exports.edit = {
//     pre: [{
//         method: PostHelper.loadPost,
//         assign: 'post'
//     }],
//     handler: (request, h) => {
//         let { post } = request.pre;
//         return h.view('post/views/edit', {
//             meta: {
//                 title: "Edit Post"
//             },
//             post
//         });
//     }
// };

exports.show = {
    pre: [{
        method: (request, h) => {
            return PostHelper.loadPost(request, h, {
                lean: true
            });
        },
        assign: 'post'
    }],
    handler: async (request, h) => {
        let { post } = request.pre;
        Post.findById(post._id, 'views').then(function (post) {
            post.views += 1;
            post.disableIndex = true;
            post.save();
        });
        try {
            return h.view('post/views/show', {
                meta: {
                    title: post.title,
                    description: post.summary,
                    image: post.thumb
                },
                post,
                include_page_header: true
            });
        } catch (error) {
            return h.response(Boom.notFound());
        }
    }
};

exports.listByCategory = {
    pre: [{
        method: (request, h) => {
            return PostHelper.loadCategory(request, h, {
                lean: true
            });
        },
        assign: 'category'
    }],
    handler: async (request, h) => {
        let { category } = request.pre;
        request.query.category = category._id;

        let postsResp = await new CmsPostsController(request, h, Post).index();

        request.query.sort = 'views|desc';
        request.query.per_page = 10;
        let mostReadPostsResp = await new CmsPostsController(request, h, Post).index();

        return h.view('post/views/list', {
            meta: {
                title: category.name
            },
            category,
            posts: postsResp.data,
            mostReadPosts: mostReadPostsResp.data
        });
    }
};

// exports.page = {
//     pre: [{
//         method: (request, h) => {
//             return PostHelper.loadPost(request, h, {
//                 lean: true,
//                 filter: {
//                     category: 'page'
//                 }
//             });
//         },
//         assign: 'post'
//     }],
//     handler: async (request, h) => {
//         let { post } = request.pre;
//         try {
//             return h.view('post/views/show', {
//                 meta: {
//                     title: post.title,
//                     description: post.summary,
//                     image: post.thumb
//                 },
//                 post,
//                 allowAdmin: request.query.allowAdmin
//             });
//         } catch (error) {
//             return h.response(Boom.notFound());
//         }
//     }
// };

// exports.delete = {
//     pre: [{
//         method: PostHelper.loadPost,
//         assign: 'post'
//     }],
//     handler: async (request, h) => {
//         let { post } = request.pre;
//         try {
//             post.remove();
//             return h.redirect('/posts');
//         } catch (error) {
//             return h.response(Boom.notFound());
//         }
//     }
// };
