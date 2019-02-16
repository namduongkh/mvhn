'use strict';

import UploadController from './controllers/upload.controller.js';
import UploadVal from './validate/upload.validate.js';

exports.register = (server, options, next) => {

  var upload = require('./util/upload')(server);
  server.expose(upload);

  server.route({
    method: 'GET',
    path: '/upload',
    handler: UploadController.index,
    config: {
      auth: false,
      description: 'Service status',
      tags: ['api']
    }
  });

  // 104857600 == 100MB
  server.route({
    method: 'POST',
    path: '/upload',
    handler: UploadController.upload,
    config: {
      auth: false,
      cors: {
        origin: ['*'],
        additionalHeaders: ['cache-control', 'x-requested-with']
      },
      payload: {
        maxBytes: 10485760,
        parse: true,
        allow: 'multipart/form-data',
        output: 'stream'
      },
      description: 'Handle Upload File',
      tags: ['api'],
      plugins: {
        'hapi-swagger': {
          responses: { '400': { 'description': 'Bad Request' } },
          payloadType: 'form'
        }
      }
    }
  });

  server.route({
    method: 'POST',
    path: '/upload/image',
    handler: UploadController.uploadImage,
    config: {
      auth: false,
      // validate: UploadVal.uploadImage,
      payload: {
        maxBytes: 10048576,
        parse: true,
        allow: 'multipart/form-data',
        output: 'stream'
      },
      description: 'Handle Upload File',
      tags: ['api'],
      plugins: {
        'hapi-swagger': {
          responses: { '400': { 'description': 'Bad Request' } },
          payloadType: 'form'
        }
      },
    }
  });

  server.route({
    method: 'POST',
    path: '/upload/uploadBase64',
    handler: UploadController.uploadBase64,
    config: {
      auth: false,
      // validate: UploadVal.uploadImage,
      payload: {
        maxBytes: 10048576,
        parse: true,
        allow: 'multipart/form-data',
        output: 'stream'
      },
      description: 'Handle Upload File',
      tags: ['api'],
      plugins: {
        'hapi-swagger': {
          responses: { '400': { 'description': 'Bad Request' } },
          payloadType: 'form'
        }
      },
    }
  });

  server.route({
    method: 'POST',
    path: '/upload/removeFile',
    handler: UploadController.removeFile,
    config: {
      auth: false,
      // validate: UploadVal.uploadImage,
      // payload: {
      //   maxBytes: 10048576,
      //   parse: true,
      //   allow: 'multipart/form-data',
      //   output: 'stream'
      // },
      description: 'Handle Upload File',
      tags: ['api'],
      plugins: {
        'hapi-swagger': {
          responses: { '400': { 'description': 'Bad Request' } },
          payloadType: 'form'
        }
      },
    }
  });

  server.route({
    method: 'POST',
    path: '/upload/moveTmptoModule',
    handler: UploadController.moveTmptoModule,
    config: {
      auth: false,
      // validate: UploadVal.uploadImage,
      // payload: {
      //   maxBytes: 10048576,
      //   parse: true,
      //   allow: 'multipart/form-data',
      //   output: 'stream'
      // },
      description: 'Handle Upload File',
      tags: ['api'],
      plugins: {
        'hapi-swagger': {
          responses: { '400': { 'description': 'Bad Request' } },
          payloadType: 'form'
        }
      },
    }
  });

  // server.route({
  //   method: 'POST',
  //   path: '/upload/multiTypeImage',
  //   handler: UploadController.multiTypeImage,
  //   config: {
  //     auth: false,
  //     // validate: UploadVal.uploadImage,
  //     payload: {
  //       maxBytes: 10048576,
  //       parse: true,
  //       allow: 'multipart/form-data',
  //       output: 'stream'
  //     },
  //     description: 'Handle Upload File',
  //     tags: ['api'],
  //     plugins: {
  //       'hapi-swagger': {
  //         responses: {'400': {'description': 'Bad Request'}},
  //         payloadType: 'form'
  //       }
  //     },
  //   }
  // });

  server.route({
    method: 'POST',
    path: '/upload/multi-image',
    handler: UploadController.multiImages,
    config: {
      auth: false,
      cors: {
        origin: ['*'],
        additionalHeaders: ['cache-control', 'x-requested-with']
      },
      payload: {
        maxBytes: 10048576,
        parse: true,
        allow: 'multipart/form-data',
        output: 'stream'
      },
      description: 'Handle Upload File',
      tags: ['api'],
      plugins: {
        'hapi-swagger': {
          responses: { '400': { 'description': 'Bad Request' } },
          payloadType: 'form'
        }
      },
    }
  });

  next();
};

exports.register.attributes = {
  name: 'upload'
};