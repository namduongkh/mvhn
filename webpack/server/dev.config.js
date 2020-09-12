import webpack from 'webpack';
import path from 'path';
import nodeExternals from 'webpack-node-externals';
import fs from 'fs';
import Glob from 'glob';

let entry = [
  'webpack/hot/poll?1000',
  'babel-core/register',
  'babel-polyfill',
  // ...Glob.sync(BASE_PATH + '/app/**/models/*.js'),
  // ...Glob.sync(BASE_PATH + '/app/**/text_searchs/*.js'),
  // ...Glob.sync(BASE_PATH + '/app/plugins/*/!(views|models)/**/*.js'),
  // ...Glob.sync(BASE_PATH + '/app/plugins/*/*.js'),
  ...Glob.sync(BASE_PATH + '/app.js'),
];

let pluginPaths = fs.readdirSync(path.join(BASE_PATH, 'app', 'plugins'), { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name)
  .join('|');

module.exports = function () {
  return {
    devtool: false,
    externals: [nodeExternals({
      whitelist: ['webpack/hot/poll?1000']
    })],
    name: 'backend',
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('development'),
          BASE_PATH: JSON.stringify(BASE_PATH)
        },
      }),
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.ContextReplacementPlugin(
        new RegExp(`^@plugins$`),
        path.resolve(BASE_PATH, 'app', 'plugins'),
        true,
        new RegExp(`^((\.\/(${pluginPaths})\/index\.js)|(\.\/(${pluginPaths})\/models\/.+\.js))$`)
      ),
      new webpack.ContextReplacementPlugin(
        new RegExp(`^@plugins/page/views/templates$`),
        path.resolve(BASE_PATH, 'app', 'plugins', 'page', 'views', 'templates'),
        true,
        new RegExp(`^.+\/data\.js$`)
      ),
      new webpack.ContextReplacementPlugin(
        new RegExp(`^@plugins/importer/classes/importers$`),
        path.resolve(BASE_PATH, 'app', 'plugins', 'importer', 'classes', 'importers'),
        true,
        new RegExp(`^.+\.js$`)
      ),
      new webpack.ContextReplacementPlugin(
        new RegExp(`^@root[\\\/]app[\\\/]db[\\\/]text_searchs$`),
        path.resolve(BASE_PATH, 'app', 'db', 'text_searchs'),
        true,
        new RegExp(`^.+\.js$`)
      )
    ],
    target: 'node',
    context: BASE_PATH,
    entry,
    output: {
      publicPath: BASE_PATH,
      path: BASE_PATH + '/server/',
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
        BASE_PATH + '/node_modules'
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
