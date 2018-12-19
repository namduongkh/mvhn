const Webpack = require('webpack')
const WebpackMerge = require('webpack-merge')
const BaseConfig = require('./base.config.js')

module.exports = function(env) {
    return WebpackMerge(BaseConfig(env.env), {
        devtool: 'source-map',
        plugins: [
            new Webpack.DefinePlugin({
                global: {
                    siteUrl: JSON.stringify('http://localhost:3000/')
                },
                process: {
                    env: {
                        NODE_ENV: JSON.stringify('development')
                    }
                }
            })
        ]
    })
}