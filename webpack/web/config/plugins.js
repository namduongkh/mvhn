const Webpack = require('webpack');
const extractStyle = require('./extractStyle');
const ExtLibs = require('./variables.js');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
const path = require('path');
const os = require('os');
const configManager = require('kea-config');
configManager.setup('./app/config');

function CommonsChunkVendor() {
    return [
        new Webpack.optimize.CommonsChunkPlugin({
            name: "commons",
            filename: "commons.js",
            chunks: global.CHUNK_NAMES
        })
    ]
}

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
        title: configManager.get('web.name'),
        logo: path.resolve("./img/favicon.png"),
        suppressSuccess: true
    })
}

function CopyWebpack() {
    return new CopyWebpackPlugin([{
        from: 'public/assets/' + configManager.get('web.context.template') + '/img',
        to: 'img'
    },
    {
        from: 'public/assets/' + configManager.get('web.context.template') + '/fonts',
        to: 'fonts'
    }
    ]);
}

function BrowserSync() {
    return new BrowserSyncPlugin({
        proxy: configManager.get('web.context.settings.services.webUrl'),
        files: ["app/**/*.*"],
        browser: os.platform() == "darwin" ? "google chrome" : "chrome",
        port: 3090
    }, {
        reload: true
    });
}

var plugins = [
    extractStyle,
    ...CommonsChunkVendor(),
    // Ignore(),
    Provide(),
    AsyncDeferWebpack(),
    CopyWebpack(),
    WebpackNotifier(),
    BrowserSync()
]

module.exports = plugins;
