"use strict";

var Joi = require('joi');

const uploadVal = {
    edit: {

    },
    save: {
        payload: {

        }
    },
    uploadImage: {
        payload: {
            file: Joi.any().required().meta({ swaggerType: 'file' }).description('File'),
            type: Joi.string().description('Type'),
            filename: Joi.string().description('File name'),
            old_filename: Joi.any().description('Older file name'),
        }
    },
    update: {
        payload: {

        },
        options: {
            allowUnknown: true
        }
    },
    deleteItem: {

    }
};
export default uploadVal;