'use strict';

module.exports = {
    web: {
        db: {
            uri: 'mongodb://localhost:27017/db_portfolio',
            options: {
                user: '',
                pass: ''
            }
        },
        context: {
            settings: {
                services: {
                    webUrl: 'http://localhost:5000',
                    cmsUrl: 'http://localhost:5000/cms'
                },
            },
        },
        htmlCompress: false
    }
};