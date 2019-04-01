'use strict';
import mongoose from "mongoose";
import Boom from "boom";
const Post = mongoose.model('Post');
import PostHelper from "./post.helper";

exports.index = {
    handler: async (request, h) => {
        let posts = await Post.find({
            status: 1,
            category: { $in: [undefined, 'post'] }
        }).sort({
            createdAt: -1
        }).lean();
        return h.view('post/views/index', {
            meta: {
                title: "Posts"
            },
            posts
        });
    }
};

exports.new = {
    handler: (request, h) => {
        return h.view('post/views/new', {
            meta: {
                title: "New Post"
            }
        });
    }
};

exports.edit = {
    pre: [{
        method: PostHelper.loadPost,
        assign: 'post'
    }],
    handler: (request, h) => {
        let { post } = request.pre;
        return h.view('post/views/edit', {
            meta: {
                title: "Edit Post"
            },
            post
        });
    }
};

exports.show = {
    pre: [{
        method: (request, h) => {
            return PostHelper.loadPost(request, h, {
                lean: true,
                filter: {
                    category: { $in: [undefined, 'post'] }
                }
            });
        },
        assign: 'post'
    }],
    handler: async (request, h) => {
        let { post } = request.pre;
        try {
            return h.view('post/views/show', {
                meta: {
                    title: post.title,
                    description: post.summary,
                    image: post.thumb
                },
                post,
                allowAdmin: request.query.allowAdmin
            });
        } catch (error) {
            return h.response(Boom.notFound());
        }
    }
};

exports.page = {
    pre: [{
        method: (request, h) => {
            return PostHelper.loadPost(request, h, {
                lean: true,
                filter: {
                    category: 'page'
                }
            });
        },
        assign: 'post'
    }],
    handler: async (request, h) => {
        let { post } = request.pre;
        try {
            return h.view('post/views/show', {
                meta: {
                    title: post.title,
                    description: post.summary,
                    image: post.thumb
                },
                post,
                allowAdmin: request.query.allowAdmin
            });
        } catch (error) {
            return h.response(Boom.notFound());
        }
    }
};

exports.delete = {
    pre: [{
        method: PostHelper.loadPost,
        assign: 'post'
    }],
    handler: async (request, h) => {
        let { post } = request.pre;
        try {
            post.remove();
            return h.redirect('/posts');
        } catch (error) {
            return h.response(Boom.notFound());
        }
    }
};
