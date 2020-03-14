'use strict'
import mongoose from "mongoose";
import _ from "lodash";

const Post = mongoose.model('Post');
const Link = mongoose.model('Link');

export default class CmsLinksController extends ResourcesController {
  async index() {
    if (this.request.query.searchPost == 'true') {
      await this.createPostLinks();
    }
    delete this.request.query.searchPost;
    delete this.request.query.searchProperty;
    this.request.query.title = new RegExp(this.request.query.title, 'gi');
    return await super.index();
  }

  async createPostLinks() {
    let { title } = this.request.query;
    let links = await Link.find({
      title: new RegExp(title, 'gi'),
      objectModel: 'Post'
    }, "objectId").lean();
    let objectIds = _.map(links, 'objectId');

    let posts = await Post.find({
      title: new RegExp(title, 'gi'),
      _id: { $nin: objectIds },
      status: 1
    }, "title slug").lean();

    for (let i in posts) {
      let post = posts[i];
      let link = await Link.findOne({
        objectModel: 'Post',
        objectId: post._id
      }, '_id').lean();
      if (!link) {
        link = new Link({
          title: post.title,
          url: `/posts/${post.slug}`,
          objectModel: 'Post',
          objectId: post._id
        });
        await link.save();
      }
      console.log(link);
    }
  }
}
