'use strict';

/*Chứa những config chung của dev thường xuyên thay đổi mỗi dự án*/

module.exports = {
    facebook: {
        clientID: process.env.FACEBOOK_ID || '427079307489462',
        clientSecret: process.env.FACEBOOK_SECRET || 'd78875d70774594c0b93d646c07cb6ab',
        callbackURL: '/auth/facebook/callback'
    },
    twitter: {
        clientID: process.env.TWITTER_KEY || 'yXwFK6ff3fOc8dvessqKvd9Z8',
        clientSecret: process.env.TWITTER_SECRET || 'k0w9heOObYwlwchdRBQ6tmHiPQN5O26nwz5XDzxPWPtby6llNx',
        callbackURL: '/auth/twitter/callback'
    },
    google: {
        clientID: process.env.GOOGLE_ID || '941481178075-mrmusgvq3asuq1relija3smn7psmogkh.apps.googleusercontent.com',
        clientSecret: process.env.GOOGLE_SECRET || 'sSIpuxYkac8r8LgXtVJ9pM6W',
        callbackURL: '/auth/google/callback'
    },
    awsService: {
        sendMail: 'https://gmqsadiyrc.execute-api.ap-southeast-1.amazonaws.com/development/utils/sendmail',
        upload: '',
        resize: '',
        crop: ''
    },
    context: {
        cmsprefix: '/admin',
        settings: {
            services: {
                webUrl: 'http://localhost:9006',
                adminUrl: 'http://localhost:9002/admin',
                apiUrl: 'http://localhost:9001/v1/api',
                uploadApi: 'http://localhost:9001/v1/api/upload/image',
            }
        }
    },
    adminassets: {
        required: [
            'script-loader?!jquery',
            'jquery-mousewheel',
            'tether',
            'bootstrap',
            'bootstrap-daterangepicker',
            'flatpickr',
            'cropper',
            /////////////////
            'bootstrap/dist/css/bootstrap.css',
            'font-awesome/scss/font-awesome.scss',
            'cropper/dist/cropper.css',
            'froala-editor/js/froala_editor.pkgd.min',
            'froala-editor/css/froala_editor.pkgd.min.css',
            'froala-editor/css/froala_style.min.css',
            'jsoneditor/dist/jsoneditor.min.css'

        ],
        css: [
            'adminassets/assets/dist/styles/vendor.css',
            'https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.1.20/jquery.fancybox.min.css',
            'https://cdnjs.cloudflare.com/ajax/libs/magnific-popup.js/1.1.0/magnific-popup.min.css',
            'adminassets/assets/startui/css/separate/pages/widgets.min.css',
            'adminassets/assets/startui/css/separate/main.css',
            'adminassets/assets/dist/styles/main.css',
        ],
        js: [
            'adminassets/assets/dist/scripts/vendor.js',
            'https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.0.3/socket.io.js',
            'https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.1.20/jquery.fancybox.min.js',
            'https://cdnjs.cloudflare.com/ajax/libs/magnific-popup.js/1.1.0/jquery.magnific-popup.min.js',
            'adminassets/assets/dist/scripts/main.js',
            'adminassets/assets/dist/scripts/common.js'
        ]
    }
}