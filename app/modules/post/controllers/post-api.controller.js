
'use strict';
import mongoose from "mongoose";
import Slug from "slug";
const Post = mongoose.model('Post');
import PostHelper from "./post.helper";
import _ from "lodash";
import UrlMetadata from "url-metadata";

exports.create = {
  handler: async (request, h) => {
    if (request.payload.post) {
      try {
        let post = await new Post(request.payload.post).save();
        return h.response(post);
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
    method: PostHelper.loadPost,
    assign: 'post'
  }],
  handler: async (request, h) => {
    let { post } = request.pre;
    if (post) {
      try {
        post = _.extend(post, request.payload.post);
        post = await post.save();
        return h.response(post);
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
    let post = Post.findOne({
      slug: slug
    }).lean();
    if (post && post._id) {
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