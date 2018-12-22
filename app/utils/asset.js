var _ = require('lodash'),
    glob = require('glob'),
    fs = require('fs');

const configManager = require('kea-config');
configManager.setup('./app/config');

exports.getAssets = function(assets, excludePath) {

    var output = this.getGlobbedFiles(assets, excludePath);
    output = output.map(src => {
        if (src.toLowerCase().indexOf('http://') === 0 || src.toLowerCase().indexOf('https://') === 0 || src.toLowerCase().indexOf('//') === 0) {
            return src;
        } else {
            return '/' + src;
        }
    });
    return output;
};
exports.getGlobbedFiles = function(globPatterns, removeRoot) {
    // For context switching
    var _this = this;

    // URL paths regex
    var urlRegex = new RegExp('^(?:[a-z]+:)?\/\/', 'i');

    // The output array
    var output = [];

    // If glob pattern is array so we use each pattern in a recursive way, otherwise we use glob
    if (_.isArray(globPatterns)) {
        globPatterns.forEach(function(globPattern) {
            output = _.union(output, _this.getGlobbedFiles(globPattern, removeRoot));
        });
    } else if (_.isString(globPatterns)) {
        if (urlRegex.test(globPatterns)) {
            output.push(globPatterns);
        } else {
            var files = glob.sync(globPatterns, {});
            if (files.length) {
                if (removeRoot) {
                    files = files.map(function(file) {
                        let isUseVersionResource = configManager.get('web.isUseVersionResource');
                        var fileModify = file;
                        if (isUseVersionResource) {
                            var stats = fs.statSync(`${BASE_PATH}/${file}`);
                            var myDate = new Date(stats.mtime);
                            let mtime = parseInt(myDate / 1000);
                            fileModify = `${file}?v=${mtime}`;
                        }

                        return fileModify.replace(removeRoot, '');
                    });
                    output = _.union(output, files);
                }
            } else {
                var gbp = globPatterns;
                if (removeRoot) {
                    gbp = gbp.replace(removeRoot, "");
                }
                output.push(gbp);
            }
        }
    }

    return output;
};