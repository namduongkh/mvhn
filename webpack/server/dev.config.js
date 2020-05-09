const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')

let entry = [
  // 'webpack/hot/poll?100',
  'babel-polyfill',
  BASE_PATH + '/app.js'
];

module.exports = function () {
  return {
    devtool: false,
    externals: [nodeExternals()],
    name: 'backend',
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('development'),
          BASE_PATH: JSON.stringify(BASE_PATH)
        },
      }),
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin()
    ],
    target: 'node',
    context: BASE_PATH,
    entry,
    output: {
      publicPath: './',
      path: BASE_PATH + '/webpack/server/bundle',
      filename: 'app.js',
      libraryTarget: "commonjs2"
    },
    resolve: {
      extensions: ['.js'],
      alias: {
        '@root': BASE_PATH,
        '@plugins': BASE_PATH + '/app/plugins',
        '@core': BASE_PATH + '/app/plugins/core'
      },
      modules: [
        BASE_PATH + 'node_modules'
      ]
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          loader: "babel-loader",
          options: {
            babelrc: true
          }
        }
      ],
    },
    node: {
      console: false,
      global: false,
      process: false,
      Buffer: false,
      __filename: false,
      __dirname: false
    }
  };
}
