const Webpack = require('webpack')
const WebpackMerge = require('webpack-merge')
const BaseConfig = require('./base.config.js')

module.exports = function(env) {
    return WebpackMerge(BaseConfig(env.env), {})
}