const Webpack = require('webpack')
const WebpackMerge = require('webpack-merge')
const BaseConfig = require('./base.config.js')

module.exports = function (env) {
    return WebpackMerge(BaseConfig(env.env, env.debug), {
        plugins: [
            // new BabiliPlugin(),
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
            })
        ]
    })
}