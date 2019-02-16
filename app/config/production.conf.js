'use strict';

module.exports = {
    web: {
        context: {
            settings: {
                services: {
                    apiUrl: process.env.URL,
                    webUrl: process.env.URL,
                },
            },
        }
    }
};