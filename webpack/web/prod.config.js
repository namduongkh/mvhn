const Webpack = require('webpack')
const WebpackMerge = require('webpack-merge')
const BaseConfig = require('./base.config.js')
const MinifyPlugin = require("babel-minify-webpack-plugin");

module.exports = function(env) {
    return WebpackMerge(BaseConfig(env.env), {
        plugins: [
            new Webpack.DefinePlugin({
                global: {},
                process: {
                    env: {
                        NODE_ENV: JSON.stringify('production')
                    }
                }
            }),
            new Webpack.LoaderOptionsPlugin({
                minimize: true,
                debug: false
            }),
            new MinifyPlugin()
        ]
    })
}
