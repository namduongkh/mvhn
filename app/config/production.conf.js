'use strict';

module.exports = {
    web: {
        context: {
            settings: {
                services: {
                    // apiUrl: 'http://www.pizunhatrang.tk',
                    webUrl: process.env.URL || 'http://www.pizunhatrang.tk',
                },
            },
        }
    }
};