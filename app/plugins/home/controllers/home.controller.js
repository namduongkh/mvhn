'use strict';
import nodemailer from 'nodemailer';
import mongoose from 'mongoose';

const Post = mongoose.model('Post');

exports.index = {
    handler: async function (request, h) {
        let posts = await Post.find({
            status: 1
        }, 'title slug category createdAt thumb')
            .sort("-createdAt")
            .populate('category', 'name slug color textClassname')
            .limit(20)
            .lean();

        return h.view('home/views/index', { posts });
    },
    auth: false
};

// exports.portfolio = {
//     handler: function (request, h) {
//         return h.view('home/views/portfolio', {
//             meta: {
//                 title: "Portfolio",
//                 description: "Some projects I have done, an overview to know and understand what I do. Phong Nguyen - Web Developer"
//             },
//             paddingTop: true
//         });
//     }
// };

