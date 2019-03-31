'use strict';

module.exports = {
    web: {
        context: {
            settings: {
                services: {
                    webUrl: process.env.URL,
                    cmsUrl: process.env.URL + '/cms'
                },
            },
        }
    }
};