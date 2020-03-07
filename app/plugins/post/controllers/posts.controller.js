'use strict';

import mongoose from "mongoose";
import Boom from "boom";
import _ from "lodash";
import PostService from "../services/post_service";
import CmsPostsController from "./cms_posts.controller";

const Post = mongoose.model('Post');
const PostTextSearch = mongoose.model('PostTextSearch');
const Property = mongoose.model('Property');
const Store = mongoose.model('Store');
const Product = mongoose.model('Product');

export default class PostController extends BaseController {

    beforeActions() {
        return {
            loadPost: [["show"]],
            loadCategory: [["listByCategory"]],
            loadTag: [["listByTag"]]
        }
    }

    async index() {
        let page = Number(this.request.query.page || 1);
        let skip = page == 1 ? 0 : (page == 2 ? 21 : 20 * (page - 1) + 1);
        let limit = page == 1 ? 21 : 20;
        let search = this.request.query.search;
        let query = {
            status: 1
        };

        if (search) {
            limit = 20;
            skip = (page - 1) * limit;

            query._id = {
                $in: _.map(await PostTextSearch.find({
                    text: { $regex: new RegExp(search, 'gi') }
                }, 'object').lean(), 'object')
            }
        }

        let posts = await Post.find(query, 'title slug category createdAt thumb')
            .sort("-createdAt")
            .populate('category', 'name slug color textClassname')
            .skip(skip)
            .limit(limit)
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

        let storeIds = await Product.distinct('store', { status: 1 });
        let stores = await Store.find({ _id: { $in: storeIds }, status: 1 }, 'name slug').lean();

        if (search) {
            return this.h.view('post/views/search_list', { posts, featuredPosts, mostReadPosts, search, page, stores });
        }

        return this.h.view('post/views/index', { posts, featuredPosts, mostReadPosts, stores });
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
            let mostReadPosts = await Post.find({
                status: 1
            }, 'title slug category createdAt thumb')
                .sort("-views -createdAt")
                .populate('category', 'name slug color textClassname')
                .limit(10)
                .lean();

            return this.h.view('post/views/show', {
                meta: {
                    title: post.title,
                    description: post.summary,
                    image: post.thumb,
                    color: post.category && post.category.color
                },
                post,
                mostReadPosts,
                include_page_header: true
            });
        } catch (error) {
            throw Boom.notFound();
        }
    }

    async listByCategory() {
        let category = this.category || { name: this.request.params.slug };
        let { search } = this.request.query;

        this.request.query.category = { $in: [category._id] };
        this.request.query.filter = search;
        delete this.request.query.search;

        let postsResp = await new CmsPostsController(Post, this.request, this.h).index();

        this.request.query.sort = 'views|desc';
        this.request.query.per_page = 10;

        let mostReadPostsResp = await new CmsPostsController(Post, this.request, this.h).index();

        return this.h.view('post/views/list', {
            meta: {
                title: category.name,
                color: category.color
            },
            category,
            posts: postsResp.data,
            search,
            mostReadPosts: mostReadPostsResp.data
        });
    }

    async listByTag() {
        let tag = this.tag || { name: this.request.params.slug };
        let { search } = this.request.query;

        this.request.query.tags = { $in: [tag._id] };
        this.request.query.filter = search;
        delete this.request.query.search;

        let postsResp = await new CmsPostsController(Post, this.request, this.h).index();

        this.request.query.sort = 'views|desc';
        this.request.query.per_page = 10;

        let mostReadPostsResp = await new CmsPostsController(Post, this.request, this.h).index();

        return this.h.view('post/views/list', {
            meta: {
                title: tag.name,
                color: tag.color
            },
            tag,
            posts: postsResp.data,
            search,
            mostReadPosts: mostReadPostsResp.data
        });
    }

    async loadPost() {
        try {
            this.post = await PostService.loadPost(this.request, {
                lean: true,
                populates: [{
                    path: "products",
                    populate: ["category"]
                }]
            });

            if (!this.post.category) {
                this.post.category = new Property({
                    color: this.request.server.configManager.get('web.context.meta.color')
                });
            }
        } catch (error) {
            throw Boom.notFound();
        }
    }

    async loadCategory() {
        this.category = await PostService.loadCategory(this.request, {
            lean: true
        });
    }

    async loadTag() {
        this.tag = await PostService.loadTag(this.request, {
            lean: true
        });
    }
}
