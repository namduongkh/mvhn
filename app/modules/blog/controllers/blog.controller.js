'use strict';
import mongoose from "mongoose";
const Blog = mongoose.model('Blog')

exports.index = {
    handler: async (request, reply) => {
        let blogs = await Blog.find({
            status: 1
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

exports.show = {
    handler: async (request, reply) => {
        try {
            let blog = await Blog.findOne({
                slug: request.params.slug
            }).lean();
            return reply.view('blog/views/show', {
                meta: {
                    title: blog.title,
                    description: blog.summary,
                    image: blog.thumb
                },
                blog,
                allowDelete: request.query.allowDelete
            });
        } catch (error) {
            return reply().code(404);
        }
    }
};

exports.delete = {
    handler: async (request, reply) => {
        try {
            let blog = await Blog.findOne({
                _id: request.params.id
            }).remove();
            return reply.redirect('/blogs');
        } catch (error) {
            return reply().code(404);
        }
    }
};
