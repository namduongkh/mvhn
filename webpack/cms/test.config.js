const Webpack = require('webpack')
const { merge } = require('webpack-merge')
const BaseConfig = require('./base.config.js')

module.exports = function(env) {
    return merge(BaseConfig(env.env), {})
}
