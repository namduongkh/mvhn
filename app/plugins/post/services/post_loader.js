'use strict';
import mongoose from "mongoose";
import _ from "lodash";

const Property = mongoose.model('Property');
const Post = mongoose.model('Post');
const PostTextSearch = mongoose.model('PostTextSearch');

export default class PostLoader {
  constructor(request) {
    this.request = request;
    this.page = Number(this.request.query.page || 1);
    this.perPage = 20;
  }

  async perform() {
    await this.loadTag();
    await this.loadCategory();

    return {
      posts: await this.loadPosts(),
      featuredPosts: await this.loadFeaturedPosts(),
      mostReadPosts: await this.loadMostReadPosts(),
      category: this.category,
      tag: this.tag,
      page: this.page,
      search: this.request.query.search
    }
  }

  async loadPosts() {
    return await Post.find(await this.defaultQuery(this.request.query.search), 'title slug category createdAt thumb')
      .sort("-createdAt")
      .populate('category', 'name slug color textClassname')
      .skip((this.page - 1) * this.perPage)
      .limit(this.perPage)
      .lean();
  }

  async loadFeaturedPosts() {
    return await Post.find(await this.defaultQuery(), 'title slug category createdAt thumb')
      .sort("-featured -createdAt")
      .populate('category', 'name slug color textClassname')
      .limit(8)
      .lean();
  }

  async loadMostReadPosts() {
    return await Post.find(await this.defaultQuery(), 'title slug category createdAt thumb')
      .sort("-views -createdAt")
      .populate('category', 'name slug color textClassname')
      .limit(10)
      .lean();
  }

  async defaultQuery(search = null) {
    let query = { status: 1 }
    if (this.category) { query.category = { $in: [this.category._id] } }
    if (this.tag) { query.tags = { $in: [this.tag._id] } }

    if (search) {
      query._id = {
        $in: await PostTextSearch.distinct('object', {
          text: { $regex: new RegExp(search, 'gi') }
        })
      }
    }

    return query;
  }

  async loadCategory() {
    let categoryId = this.request.params.categoryId || this.request.query.categoryId;

    if (!categoryId) return;

    this.category = await Property.findOne({
      slug: categoryId,
      status: 1,
      type: 'category'
    }).lean();
  }

  async loadTag() {
    let tagId = this.request.params.tagId || this.request.query.tagId;

    if (!tagId) return;

    this.tag = await Property.findOne({
      slug: tagId,
      status: 1,
      type: 'tag'
    }).lean();
  }
}
