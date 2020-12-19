const Webpack = require('webpack')
const { merge } = require('webpack-merge')
const BaseConfig = require('./base.config.js')

module.exports = function (env) {
    return merge(BaseConfig(env.env), {
        mode: 'development',
        devtool: 'source-map',
        plugins: [
            new Webpack.DefinePlugin({
                global: {},
                process: {
                    env: {
                        NODE_ENV: JSON.stringify('development')
                    }
                }
            })
        ]
    })
}
