const fs = require('fs');
const path = require('path');
const easyimg = require('easyimage');

const Promise = require('bluebird');
const mkdirp = Promise.promisifyAll(require('mkdirp'));
Promise.promisifyAll(fs);

//get file extension
var getFileExt = function(fileName) {
    var fileExt = fileName.split(".");
    if (fileExt.length === 1 || (fileExt[0] === "" && fileExt.length === 2)) {
        return "";
    }
    return fileExt.pop();
};
//get file upload name - without extension
var getFileName = function(fileName) {
    return fileName.substring(0, fileName.lastIndexOf('.'));
};

var fileValidate = function(fileName, allowExts, cb) {
    var allowExts = allowExts.split(',');
    allowExts = allowExts.map(function(item) {
        return item.trim();
    });
    var fileExt = getFileExt(fileName).toLowerCase();
    if (allowExts.indexOf(fileExt) > -1) {
        cb(null, true);
    }
    cb(null, false);
};

var preUpload = function(fileName, uploadPath, callback) {

    //make folder
    mkdirp.mkdirpAsync(uploadPath).then(() => {
        return fs.accessAsync(path.join(uploadPath), fs.constants.R_OK);
    })
    .then(() => {
        fileName = getFileName(fileName) + '-' + Date.now() + '.' + getFileExt(fileName);
    })
    .catch(err => {
        callback(err);
    })
    .finally(() => {
        callback(null, fileName);
    });
}
var writeFile = function(readableStreamFile, fileName, uploadPath) {
    return new Promise(function(fulfill, reject) {
        let dest = path.join(uploadPath, fileName);
        var writeStream = fs.createWriteStream(dest);
        writeStream.on('error', reject);
        readableStreamFile.pipe(writeStream);
        readableStreamFile.on('end', function() {
            var fileInfo = {
                filename: fileName
            }
            fulfill(fileInfo);

        });
    });
}

var upload = function(uploadSteam, fileName, uploadPath, subFolder, old_filename) {
    //add subfolder to upload path
    if (subFolder) {
        uploadPath = path.join(uploadPath, subFolder);
    }
    return new Promise(function(fulfill, reject) {
        // console.log("Old filename", old_filename);
        if (old_filename) {
            var old_path = path.join(uploadPath, old_filename);
            if (fs.existsSync(old_path)) {
                fs.unlink(old_path, function(err) {
                    if (err) {
                        console.log("Err: ", err);
                        reject(err);
                    }
                })
            }
        }
        preUpload(fileName, uploadPath, function(err, fileName) {
            if (err) {
                reject(err);
            }
            writeFile(uploadSteam, fileName, uploadPath)
            .then((fileInfo) => {
                fulfill(fileInfo);
            })
            .catch(err => {
                reject(err);
            });
        });
    });
}

var cropImg = function(src, dest, cropW, cropH, x, y, quality, gravity) {
    return easyimg.crop({
        src: src,
        dst: dest,
        cropwidth: cropW,
        cropheight: cropH,
        x: x || 0,
        y: y || 0,
        quality: quality || 80,
        gravity: gravity || 'NorthWest'
    });
}

var resizeImg = function(src, dest, width, height) {
    return easyimg.resize({
        src: src,
        dst: dest,
        width: width,
        height: height,
        quality: 100
    });
}

var removeFiles = function(paths) {
    return new Promise.map(paths, (item, index) => {
        if (fs.existsSync(item)) {
            fs.unlink(item, function(err) {
                if (err) {
                    console.log("Err: ", err);
                }
            });
        }
    })
}

var moveFile = function(oldPath, newPath, callback) {
    /*tạo folder nếu chưa có*/
    if (fs.existsSync(oldPath)) {
        /*Loại bỏ tên file trong path*/
        let arrPath = newPath.split('/');
        arrPath.pop();
        let pathFolderNew = arrPath.join('/');

        mkdirp.mkdirpAsync(pathFolderNew).then(() => {
            return fs.accessAsync(path.join(pathFolderNew), fs.constants.R_OK);
        })
        .catch(err => {
            console.error(err)
        })
        .finally(() => {
            fs.rename(oldPath, newPath, function (err) {
                if (err) {
                    if (err.code === 'EXDEV') {
                        copy();
                    } else {
                        callback(err);
                    }
                    return;
                }
                callback({success:true})
            });
            console.log('pow!')
        });
    }

    function copy() {
        var readStream = fs.createReadStream(oldPath);
        var writeStream = fs.createWriteStream(newPath);
        readStream.on('error', callback);
        writeStream.on('error', callback);
        readStream.on('close', function () {
            fs.unlink(oldPath, callback({success:true}));
        });
        readStream.pipe(writeStream);
    }
}

module.exports = function(server, options) {
    return {
        upload: upload,
        cropImg: cropImg,
        moveFile: moveFile,
        resizeImg: resizeImg,
        removeFiles: removeFiles
    }
}