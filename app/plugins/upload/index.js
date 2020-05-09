'use strict';

import UploadController from './controllers/upload.controller.js';
import UploadVal from './validate/upload.validate.js';
import mongoose from "mongoose";
import MediasController from "./controllers/medias_controller";
import GoogleDriveService from "./services/google_drive_service";
import GooglePhotoService from "./services/google_photo_service";
import { ServerRouter, Routes, ResourcesController } from "@core/modules";

const Media = mongoose.model('Media')

exports.register = async (server, options, next) => {
  const routes = new Routes(server);
  routes.resources(ResourcesController, 'medias', Media);
  const serverRouter = new ServerRouter(server);

  serverRouter.resources('medias', MediasController);

  var upload = require('./util/upload')(server);
  server.expose(upload);

  server.expose('GoogleDriveService', GoogleDriveService);
  server.expose('GooglePhotoService', GooglePhotoService);

  server.route({
    method: 'GET',
    path: '/api/upload',
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
    path: '/api/upload',
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
    path: '/api/upload/image',
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
    path: '/upload/file',
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
    path: '/api/upload/uploadBase64',
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
    path: '/api/upload/removeFile',
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
    path: '/api/upload/moveTmptoModule',
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
  //   path: '/api/upload/multiTypeImage',
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
    path: '/api/upload/multi-image',
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
};

exports.register.attributes = {
  name: 'upload'
};
