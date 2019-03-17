'use strict';

module.exports = {
    web: {
        context: {
            settings: {
                services: {
                    webUrl: process.env.URL
                },
            },
        }
    }
};