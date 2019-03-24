const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractStyle = new ExtractTextPlugin({
    filename: 'styles/[name].css',
    allChunks: false
});

module.exports = extractStyle;