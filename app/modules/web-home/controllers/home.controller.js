'use strict';
const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const striptags = require('striptags');
const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();

exports.index = {
    handler: function(request, reply) {
        // console.log("Auth", request.auth);
        return reply.view('web-home/views/index', {
            meta: {
                title: "Trang chủ"
            },
            invokeSlider: true
        });
    }
};

exports.detail = {
    handler: function(request, reply) {
        // console.log("Auth", request.auth);
        let { slug } = request.params;
        Product.findOne({
                slug: slug
            })
            .select("title image intro")
            .lean()
            .then(function(product) {
                if (product) {
                    return reply.view('web-home/views/detail', {
                        slug: slug,
                        meta: {
                            title: product.title,
                            image: request.server.configManager.get("web.settings.services.webUrl") + "/files/products/" + product._id + "/" + product.image,
                            description: entities.decode(striptags(product.intro))
                        }
                    });
                } else {
                    return reply.redirect("/khong-tim-thay-noi-dung")
                }
            })

    }
};

exports.detailShortId = {
    handler: function(request, reply) {
        let { shortId } = request.params;
        Product.findOne({
                shortId: shortId
            })
            .select("slug")
            .lean()
            .then(function(product) {
                if (product) {
                    return reply.redirect("/san-pham/" + product.slug);
                } else {
                    return reply.redirect("/khong-tim-thay-noi-dung")
                }
            });
    }
};