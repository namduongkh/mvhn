'use strict';

exports.dangNhap = {
    handler: function(request, reply) {
        if (request.auth.isAuthenticated) {
            return reply.redirect('/');
        }
        return reply.view('web-user/views/login', {
            meta: {
                title: "Đăng nhập"
            }
        });
    },
};

exports.dangKy = {
    handler: function(request, reply) {
        if (request.auth.isAuthenticated) {
            return reply.redirect('/');
        }
        return reply.view('web-user/views/register', {
            meta: {
                title: "Đăng ký"
            }
        });
    },
};

exports.gioHang = {
    handler: function(request, reply) {
        return reply.view('web-user/views/cart', {
            meta: {
                title: "Giỏ hàng"
            }
        });
    },
};