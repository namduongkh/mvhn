
'use strict';
import mongoose from "mongoose";
const Blog = mongoose.model('Blog')

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