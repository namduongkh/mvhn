'use strict';
import mongoose from "mongoose";
import Boom from "boom";
const Blog = mongoose.model('Blog');
import BlogHelper from "./blog.helper";

exports.index = {
    handler: async (request, h) => {
        let blogs = await Blog.find({
            status: 1,
            category: { $in: [undefined, 'blog'] }
        }).sort({
            createdAt: -1
        }).lean();
        return h.view('blog/views/index', {
            meta: {
                title: "Blogs"
            },
            blogs
        });
    }
};

exports.new = {
    handler: (request, h) => {
        return h.view('blog/views/new', {
            meta: {
                title: "New Blog"
            }
        });
    }
};

exports.edit = {
    pre: [{
        method: BlogHelper.loadBlog,
        assign: 'blog'
    }],
    handler: (request, h) => {
        let { blog } = request.pre;
        return h.view('blog/views/edit', {
            meta: {
                title: "Edit Blog"
            },
            blog
        });
    }
};

exports.show = {
    pre: [{
        method: (request, h) => {
            return BlogHelper.loadBlog(request, h, {
                lean: true,
                filter: {
                    category: { $in: [undefined, 'blog'] }
                }
            });
        },
        assign: 'blog'
    }],
    handler: async (request, h) => {
        let { blog } = request.pre;
        try {
            return h.view('blog/views/show', {
                meta: {
                    title: blog.title,
                    description: blog.summary,
                    image: blog.thumb
                },
                blog,
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
            return BlogHelper.loadBlog(request, h, {
                lean: true,
                filter: {
                    category: 'page'
                }
            });
        },
        assign: 'blog'
    }],
    handler: async (request, h) => {
        let { blog } = request.pre;
        try {
            return h.view('blog/views/show', {
                meta: {
                    title: blog.title,
                    description: blog.summary,
                    image: blog.thumb
                },
                blog,
                allowAdmin: request.query.allowAdmin
            });
        } catch (error) {
            return h.response(Boom.notFound());
        }
    }
};

exports.delete = {
    pre: [{
        method: BlogHelper.loadBlog,
        assign: 'blog'
    }],
    handler: async (request, h) => {
        let { blog } = request.pre;
        try {
            blog.remove();
            return h.redirect('/blogs');
        } catch (error) {
            return h.response(Boom.notFound());
        }
    }
};
