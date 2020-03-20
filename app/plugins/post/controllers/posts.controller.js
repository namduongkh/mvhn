'use strict';

import mongoose from "mongoose";
import Boom from "boom";
import _ from "lodash";
import PostService from "../services/post_service";
import PostLoader from "../services/post_loader";

const Post = mongoose.model('Post');
const Property = mongoose.model('Property');
const Store = mongoose.model('Store');
const Product = mongoose.model('Product');

export default class PostController extends BaseController {

    beforeActions() {
        return {
            loadPost: [["show"]],
        }
    }

    async index() {
        let result = await this.loadPosts();

        return this.h.view(result.search ? 'post/views/search_list' : 'post/views/index', _.merge({ stores: await this.loadStores() }, result));
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
                status: 1,
                category: post.category._id,
                _id: { $ne: post._id }
            }, 'title slug category createdAt thumb')
                .sort("-views -createdAt")
                .populate('category', 'name slug color textClassname')
                .limit(4)
                .lean();
            let newPosts = await Post.find({
                status: 1,
                category: post.category._id,
                _id: { $ne: post._id }
            }, 'title slug category createdAt thumb')
                .sort("-createdAt")
                .populate('category', 'name slug color textClassname')
                .limit(4)
                .lean();
            let relatedPosts = _.concat(
                await Post.find({
                    status: 1,
                    tags: { $in: post.tags },
                    _id: { $ne: post._id }
                }, 'title slug category createdAt thumb')
                    .sort("-createdAt")
                    .populate('category', 'name slug color textClassname')
                    .limit(4)
                    .lean(),
                await Post.find({
                    status: 1,
                    _id: { $ne: post._id }
                }, 'title slug category createdAt thumb')
                    .sort("-createdAt")
                    .populate('category', 'name slug color textClassname')
                    .limit(4)
                    .lean()).slice(0, 4);

            return this.h.view('post/views/show', {
                meta: {
                    title: post.title,
                    description: post.summary,
                    image: post.thumb,
                    color: post.category && post.category.color
                },
                post,
                mostReadPosts,
                newPosts,
                relatedPosts,
                include_page_header: true
            });
        } catch (error) {
            throw Boom.notFound();
        }
    }

    async listByCategory() {
        let result = await this.loadPosts();

        return this.h.view(result.search ? 'post/views/search_list' : 'post/views/list', _.merge({
            meta: {
                title: result.category.name,
                color: result.category.color
            },
            stores: await this.loadStores()
        }, result));
    }

    async listByTag() {
        let result = await this.loadPosts();

        return this.h.view(result.search ? 'post/views/search_list' : 'post/views/list', _.merge({
            meta: {
                title: result.tag.name,
                color: result.tag.color
            },
            stores: await this.loadStores()
        }, result));
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

    async loadStores() {
        if (!this.request.server.plugins['store']) return;

        let { StoreLoader } = this.request.server.plugins['store'];
        return await (new StoreLoader(this.request)).perform();
    }

    async loadPosts() {
        return await (new PostLoader(this.request)).perform();
    }
}
