'use strict';
import mongoose from "mongoose";
import Boom from "boom";
const Post = mongoose.model('Post');
import PostHelper from "../helpers/post.helper";
import CmsPostsController from "./cms_posts.controller";
import BaseController from "./base.controller";

export default class PostController extends BaseController {

    beforeActions() {
        return {
            loadPost: [["show"]],
            loadCategory: [["listByCategory"]],
        }
    }

    async index() {
        let posts = await Post.find({
            status: 1
        }, 'title slug category createdAt thumb')
            .sort("-createdAt")
            .populate('category', 'name slug color textClassname')
            .limit(20)
            .lean();

        let featuredPosts = await Post.find({
            status: 1
        }, 'title slug category createdAt thumb')
            .sort("-featured -createdAt")
            .populate('category', 'name slug color textClassname')
            .limit(8)
            .lean();

        let mostReadPosts = await Post.find({
            status: 1
        }, 'title slug category createdAt thumb')
            .sort("-views -createdAt")
            .populate('category', 'name slug color textClassname')
            .limit(10)
            .lean();

        return this.h.view('post/views/index', { posts, featuredPosts, mostReadPosts });
    }

    async show() {
        let { post } = this;
        if (!post) throw Boom.notFound();

        Post.findById(post._id, 'views').then(function (post) {
            post.views += 1;
            post.disableIndex = true;
            post.save();
        });
        try {
            return this.h.view('post/views/show', {
                meta: {
                    title: post.title,
                    description: post.summary,
                    image: post.thumb
                },
                post,
                include_page_header: true
            });
        } catch (error) {
            throw Boom.notFound();
        }
    }

    async listByCategory() {
        let { category } = this;
        this.request.query.category = category._id;

        let postsResp = await new CmsPostsController(this.request, this.h, Post).index();

        this.request.query.sort = 'views|desc';
        this.request.query.per_page = 10;
        let mostReadPostsResp = await new CmsPostsController(this.request, this.h, Post).index();

        return this.h.view('post/views/list', {
            meta: {
                title: category.name
            },
            category,
            posts: postsResp.data,
            mostReadPosts: mostReadPostsResp.data
        });
    }

    async loadPost() {
        this.post = await PostHelper.loadPost(this.request, {
            lean: true
        });
    }

    async loadCategory() {
        this.category = await PostHelper.loadCategory(this.request, {
            lean: true
        });
    }
}
