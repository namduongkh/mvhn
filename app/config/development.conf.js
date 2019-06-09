'use strict';

module.exports = {
    web: {
        db: {
            host: 'localhost:27017',
            user: '',
            password: '',
            name: 'db_mucngay'
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