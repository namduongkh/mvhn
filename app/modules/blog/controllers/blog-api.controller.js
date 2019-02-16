
'use strict';
import mongoose from "mongoose";
import Slug from "slug";
const Blog = mongoose.model('Blog');
import BlogHelper from "./blog.helper";
import _ from "lodash";

exports.create = {
  handler: async (request, reply) => {
    if (request.payload.blog) {
      try {
        let blog = await new Blog(request.payload.blog).save();
        return reply(blog);
      } catch (error) {
        console.log('Error', error);
        return reply(false).code(400);
      }
    } else {
      return reply(false).code(400);
    }
  }
};

exports.update = {
  pre: [{
    method: BlogHelper.loadBlog,
    assign: 'blog'
  }],
  handler: async (request, reply) => {
    let { blog } = request.pre;
    debugger
    if (blog) {
      try {
        blog = _.extend(blog, request.payload.blog);
        blog = await blog.save();
        return reply(blog);
      } catch (error) {
        console.log('Error', error);
        return reply(false).code(400);
      }
    } else {
      return reply(false).code(400);
    }
  }
};

exports.generateSlug = {
  handler: async (request, reply) => {
    let { title } = request.payload;
    let slug = Slug(title);
    let blog = Blog.findOne({
      slug: slug
    }).lean();
    if (blog && blog._id) {
      slug += `-${moment().format('DDMMYYYYHHmm')}`
    }
    return reply(slug.toLowerCase());
  }
};