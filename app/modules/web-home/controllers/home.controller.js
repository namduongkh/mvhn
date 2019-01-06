'use strict';

exports.index = {
    handler: function (request, reply) {
        // console.log("Auth", request.auth);
        // var DB = request.server.plugins['app-pouchdb'];
        return reply.view('web-home/views/index', {
            hello1() {
                return 111;
            },
            meta: {
                title: "Trang chủ"
            },
            invokeSlider: true
        }, {
            // layout: false
        });
    }
};
