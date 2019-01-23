'use strict';

module.exports = {
    web: {
        context: {
            settings: {
                services: {
                    // apiUrl: 'http://www.pizunhatrang.tk',
                    webUrl: process.HEROKU_URL || 'http://www.pizunhatrang.tk',
                },
            },
        }
    }
};