const Webpack = require('webpack');
const ExtLibs = require('./variables.js');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
const path = require('path');
const os = require('os');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const configManager = require('kea-config');
configManager.setup('./app/config');

function AsyncDeferWebpack() {
    return new ScriptExtHtmlWebpackPlugin({
        defaultAttribute: 'defer'
    })
}

function Ignore() {
    return new Webpack.IgnorePlugin(/^\.\/locale$/, [/moment$/]);
}

function Provide() {
    return new Webpack.ProvidePlugin(ExtLibs.ProvidePlugin)
}

function WebpackNotifier() {
    return new WebpackBuildNotifierPlugin({
        title: configManager.get('web.name') + '-cms',
        logo: path.resolve("./img/favicon.png"),
        suppressSuccess: true
    })
}

function CopyWebpack() {
    return new CopyWebpackPlugin([{
        from: 'public/cms/assets/images',
        to: 'images'
    },
    {
        from: 'public/cms/assets/fonts',
        to: 'fonts'
    }
    ]);
}

function BrowserSync() {
    return new BrowserSyncPlugin({
        proxy: "http://localhost:9002/admin",
        // files: ["app/templates/admin/skin/**/*.*"],
        files: ["app/**/*.*"],
        browser: os.platform() == "darwin" ? "google chrome" : "chrome",
        port: 3092
    }, {
        reload: true
    });
}

var plugins = [
    // Ignore(),
    new MiniCssExtractPlugin({
        filename: 'styles/[name].css',
        chunkFilename: 'styles/[name].css',
    }),
    new VueLoaderPlugin(),
    Provide(),
    AsyncDeferWebpack(),
    CopyWebpack(),
    // WebpackNotifier(),
    // BrowserSync(),
]

module.exports = plugins;
