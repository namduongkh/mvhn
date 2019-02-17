'use strict';
import mongoose from "mongoose";
import Boom from "boom";
const Blog = mongoose.model('Blog');
import BlogHelper from "./blog.helper";

exports.index = {
    handler: async (request, reply) => {
        let blogs = await Blog.find({
            status: 1,
            category: { $in: [undefined, 'blog'] }
        }).sort({
            createdAt: -1
        }).lean();
        return reply.view('blog/views/index', {
            meta: {
                title: "Blogs"
            },
            blogs
        });
    }
};

exports.new = {
    handler: (request, reply) => {
        return reply.view('blog/views/new', {
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
    handler: (request, reply) => {
        let { blog } = request.pre;
        return reply.view('blog/views/edit', {
            meta: {
                title: "Edit Blog"
            },
            blog
        });
    }
};

exports.show = {
    pre: [{
        method: (request, reply) => {
            return BlogHelper.loadBlog(request, reply, {
                lean: true,
                filter: {
                    category: { $in: [undefined, 'blog'] }
                }
            });
        },
        assign: 'blog'
    }],
    handler: async (request, reply) => {
        let { blog } = request.pre;
        try {
            return reply.view('blog/views/show', {
                meta: {
                    title: blog.title,
                    description: blog.summary,
                    image: blog.thumb
                },
                blog,
                allowAdmin: request.query.allowAdmin
            });
        } catch (error) {
            return reply(Boom.notFound());
        }
    }
};

exports.page = {
    pre: [{
        method: (request, reply) => {
            return BlogHelper.loadBlog(request, reply, {
                lean: true,
                filter: {
                    category: 'page'
                }
            });
        },
        assign: 'blog'
    }],
    handler: async (request, reply) => {
        let { blog } = request.pre;
        try {
            return reply.view('blog/views/show', {
                meta: {
                    title: blog.title,
                    description: blog.summary,
                    image: blog.thumb
                },
                blog,
                allowAdmin: request.query.allowAdmin
            });
        } catch (error) {
            return reply(Boom.notFound());
        }
    }
};

exports.delete = {
    pre: [{
        method: BlogHelper.loadBlog,
        assign: 'blog'
    }],
    handler: async (request, reply) => {
        let { blog } = request.pre;
        try {
            blog.remove();
            return reply.redirect('/blogs');
        } catch (error) {
            return reply(Boom.notFound());
        }
    }
};
