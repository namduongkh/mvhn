const Webpack = require('webpack')
const WebpackMerge = require('webpack-merge')
const BaseConfig = require('./base.config.js')

module.exports = function(env) {
    return WebpackMerge(BaseConfig(env.env, env.debug), {
        plugins: [
            new Webpack.DefinePlugin({
                global: {
                    siteUrl: JSON.stringify('https://namduongkh.github.io/catch-fruit-game/')
                },
                process: {
                    env: {
                        NODE_ENV: JSON.stringify('production')
                    }
                }
            }),
        ]
    })
}