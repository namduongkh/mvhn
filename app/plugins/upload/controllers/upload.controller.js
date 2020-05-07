'use strict';

const _ = require('lodash');
const fs = require('fs');
const Boom = require('boom');
const path = require('path');
import File from '../../../utils/File';

export default {
  index,
  upload,
  uploadImage,
  uploadBase64,
  multiImages,
  moveTmptoModule,
  removeFile
};

function index(request, h) {
  return h.response({ status: true, msg: 'It works' });
}

function upload(request, h) {
  let configManager = request.server.configManager;
  let uploadUtil = request.server.plugins['upload'];
  let uploadPath = configManager.get('web.upload.path');

  let data = request.payload
  let uploadSteam = data.file;
  let subFolder = data.type || uploadSteam.hapi.headers['content-type'];
  let fileName = data.filename || uploadSteam.hapi.filename
  fileName = fileName.replace(/\s/g, '');
  fileName = fileName.replace(/%2520/g, '%20');
  fileName = fileName.replace(/%20/g, ' ');

  data.old_filename = data.old_filename || fileName

  return uploadUtil
    .upload(uploadSteam, fileName, uploadPath, subFolder, data.old_filename)
    .then((fileInfo) => {
      let fullPath = path.join(uploadPath, subFolder);
      let filePath = path.join(fullPath, fileInfo.filename);
      let zipType = ['application/x-zip-compressed', 'application/zip']

      // unzip if zip file
      if (zipType.includes(uploadSteam.hapi.headers['content-type']) && subFolder == 'email-template') {
        let templatePath = path.join(subFolder, fileInfo.filename).slice(0, -4);
        let unzipPath = path.join(fullPath, fileInfo.filename).slice(0, -4);

        return File
          .extract(filePath, unzipPath)
          .then(done => {
            return File
              .deleteFile(filePath)
              .then(done => {
                return h.response({
                  status: true,
                  fileInfo,
                  data: {
                    subFolder,
                    fullPath,
                    filePath,
                    unzipPath,
                    templatePath,
                    link: 'files/' + subFolder + '/' + fileInfo.filename
                  }
                });
              })
              .catch(err => {
                return h.response(err)
              })
          })
          .catch(err => {
            return h.response(err)
          })
      } else {
        return h.response({
          status: true,
          fileInfo,
          data: {
            subFolder,
            fullPath,
            filePath,
            link: 'files/' + subFolder + '/' + fileInfo.filename
          }
        });
      }
    })
    .catch(err => {
      request.log(['error', 'upload'], err);
      throw (Boom.badRequest(err));
    });
}

async function uploadImage(request, h) {
  let configManager = request.server.configManager;
  let data = request.payload;
  let uploadSteam = data.file;
  let fileName = data.filename || uploadSteam.hapi.filename;
  fileName = fileName.replace(/\s/g, '');
  fileName = fileName.replace(/%2520/g, '%20');
  fileName = fileName.replace(/%20/g, ' ');
  let uploadPath = configManager.get('web.upload.path');
  let subFolder = data.type || uploadSteam.hapi.headers['content-type'];
  let uploadUtil = request.server.plugins['upload'];

  if (/.(jpg|jpeg|gif|png|svg$)/i.test(fileName)) {
    if (process.env.UPLOAD_TO_PHOTO) {
      let { GooglePhotoService } = request.server.plugins['upload'];
      let service = await GooglePhotoService.getInstance(request.server);
      let medias = await service.upload(uploadSteam) || [];

      return {
        status: 'OK',
        data: {
          ...medias[0],
          link: medias[0].path
        }
      }
    }

    let { GoogleDriveService } = request.server.plugins['upload'];
    let service = await GoogleDriveService.getInstance(request.server);
    if (process.env.UPLOAD_TO_DRIVE && service.valid()) {
      let media = await service.upload(uploadSteam);

      return {
        status: 'OK',
        data: {
          ...media,
          link: media.path
        },
        link: media.path
      }
    }
  }

  return uploadUtil
    .upload(uploadSteam, fileName, uploadPath, subFolder, data.old_filename)
    .then((fileInfo) => {
      let webUrl = configManager.get('web.context.settings.services.webUrl');
      if (subFolder && subFolder.substr(0, 7) == 'wysiwyg') return h.response({ link: webUrl + '/files/' + subFolder + '/' + fileInfo.filename });
      return h.response({
        status: 'OK',
        data: {
          subFolder,
          link: 'files/' + subFolder + '/' + fileInfo.filename,
          filename: fileInfo.filename
        },
        file: fileInfo
      });
    })
    .catch(err => {
      console.log(err);
      request.log(['error', 'upload'], err);
      throw (Boom.badRequest(err));
    });
}

function uploadBase64(request, h) {
  let data = request.payload.image;
  if (!data)
    throw (Boom.badRequest('Can not read image upload'));

  let matches = data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
  if (matches.length !== 3) {
    throw (Boom.badRequest('Invalid image'));;
  }

  let type = matches[1];
  let imageBuffer = new Buffer(matches[2], 'base64');

  let config = request.server.configManager;
  let directory = request.payload.directory || 'base64';
  let prefix = request.payload.prefix;
  let fileName = (prefix ? prefix : directory) + '-' + Date.now() + '.jpg';
  // fix if dir config not exits
  if (!fs.existsSync(config.get('web.upload.path'))) {
    fs.mkdirSync(config.get('web.upload.path'));
  }

  let dist = config.get('web.upload.path') + '/' + directory;
  if (!fs.existsSync(dist)) {
    fs.mkdirSync(dist);
  }

  dist = dist + '/' + fileName;

  // Save image to disk
  return new Promise(function (rs) {
    fs.writeFile(dist, imageBuffer, function (err) {
      if (err) {
        console.log('erro', err);
        throw (Boom.badRequest('Error occur while save image'));;
      }
      else {
        let dataReply = {
          name: fileName,
          directory: directory,
          type: type,
          link: `/files/${directory}/${fileName}`
        };
        rs(dataReply)
      }
    });
  }).then(function (dataReply) {
    return h.response(dataReply);
  });
}

function removeFile(request, h) {
  let configManager = request.server.configManager;
  let data = request.payload.data;
  let uploadPath = configManager.get('web.upload.path');
  let uploadUtil = request.server.plugins['upload'];

  if (data.filePath) {
    var old_path = path.join(uploadPath, data.filePath);
    uploadUtil.removeFiles([old_path]);

    return h.response({ success: true });
  }

  return h.response({ success: false, message: 'Not file' });
}

function moveTmptoModule(request, h) {
  let configManager = request.server.configManager;
  let data = request.payload.data;
  let fileRemove = request.payload.fileRemove;
  let uploadPath = configManager.get('web.upload.path');
  let uploadUtil = request.server.plugins['upload'];

  var moveToModule = function (value) {
    let arrPath = value.split('/');
    if (arrPath[1] == 'tmp') {
      /*Format full path source, dest*/
      arrPath.splice(0, 1);
      let source = '/' + arrPath.join('/');
      source = path.join(uploadPath, source);
      arrPath.splice(0, 1);
      let dest = '/' + arrPath.join('/');
      dest = path.join(uploadPath, dest)

      uploadUtil.moveFile(source, dest, function (resp) { })

      /*Set new Path*/
      let newPath = value.split('/');
      newPath = newPath.splice(0, 2);
      newPath = 'files/' + arrPath.join('/');

      return newPath;
    } else return value;
  }
  _.map(data, function (value, index) {
    if (Array.isArray(value)) {
      _.map(value, function (val, ind) {
        data[index][ind] = moveToModule(val);
      })
    }
    if (typeof value === 'string')
      data[index] = moveToModule(value);
  });

  /*Delete file cũ*/
  let tmpfileRemove = [];
  _.map(fileRemove, function (value, index) {
    if (value)
      tmpfileRemove.push(path.join(uploadPath, value.substring(5, value.length)));
  });
  uploadUtil.removeFiles(tmpfileRemove);

  return h.response({ data });
}

async function multiImages(request, h) {
  let configManager = request.server.configManager;
  let files = request.payload;

  /*upload multi vue-core-image-upload*/
  if (files['file[]']) {
    if (Array.isArray(files['file[]']))
      files = files['file[]'];
    else
      files = [files['file[]']]
  }

  let { GoogleDriveService } = request.server.plugins['upload'];
  let service = await GoogleDriveService.getInstance(request.server);
  if (process.env.UPLOAD_TO_DRIVE && service.valid()) {
    let medias = await service.uploads(files);

    return {
      status: 'OK',
      data: medias.filter((media) => { return media && media._id }).map((media) => {
        return {
          ...media,
          link: media.path,
          filename: media.name
        }
      })
    }
  }

  let uploadPath = configManager.get('web.upload.path');
  let uploadUtil = request.server.plugins['upload'];
  let result = [], success = 0, failed = 0;
  for (var prop in files) {
    var data = files[prop];
    let uploadSteam = data;
    let fileName = data.filename || uploadSteam.hapi.filename;
    let subFolder = data.type || uploadSteam.hapi.headers['content-type'];

    /*set subFolder for upload multi vue-core-image-upload*/
    if (request.payload.type)
      subFolder = request.payload.type

    var fileInfo = await uploadUtil.upload(uploadSteam, fileName, uploadPath, subFolder, data.old_filename);
    if (fileInfo) {
      success++;
      result.push({
        uploadPath,
        subFolder,
        link: `files/${subFolder}/${fileInfo.filename}`,
        filename: fileInfo.filename
      });
    }
    else {
      failed++;
    }
  }
  return h.response({
    status: 'OK',
    data: result,
    success,
    failed
  })
}
