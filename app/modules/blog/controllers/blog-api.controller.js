
'use strict';
import mongoose from "mongoose";
import Slug from "slug";
const Blog = mongoose.model('Blog');
import BlogHelper from "./blog.helper";
import _ from "lodash";
import UrlMetadata from "url-metadata";

exports.create = {
  handler: async (request, h) => {
    if (request.payload.blog) {
      try {
        let blog = await new Blog(request.payload.blog).save();
        return h.response(blog);
      } catch (error) {
        console.log('Error', error);
        return h.response(false).code(400);
      }
    } else {
      return h.response(false).code(400);
    }
  }
};

exports.update = {
  pre: [{
    method: BlogHelper.loadBlog,
    assign: 'blog'
  }],
  handler: async (request, h) => {
    let { blog } = request.pre;
    if (blog) {
      try {
        blog = _.extend(blog, request.payload.blog);
        blog = await blog.save();
        return h.response(blog);
      } catch (error) {
        console.log('Error', error);
        return h.response(false).code(400);
      }
    } else {
      return h.response(false).code(400);
    }
  }
};

exports.generateSlug = {
  handler: async (request, h) => {
    let { title } = request.payload;
    let slug = Slug(title);
    let blog = Blog.findOne({
      slug: slug
    }).lean();
    if (blog && blog._id) {
      slug += `-${moment().format('DDMMYYYYHHmm')}`
    }
    return h.response(slug.toLowerCase());
  }
};

exports.fetchMetadata = {
  handler: async (request, h) => {
    let { url } = request.payload;
    UrlMetadata(url).then(
      function (metadata) { // success handler
        return h.response(metadata);
      },
      function (error) { // failure handler
        return h.response({});
      });
  }
};