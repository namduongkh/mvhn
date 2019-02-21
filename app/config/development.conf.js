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
                    apiUrl: 'http://localhost:5005',
                    webUrl: 'http://localhost:5005',
                },
            },
        },
        htmlCompress: false
    }
};