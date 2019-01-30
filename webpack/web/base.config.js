const CleanWebpackPlugin = require('clean-webpack-plugin');
const PATHS = require('./config/path');
const ENTRIES = require('./config/entries');
const LOADERS = require('./config/loaders');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const extractStyle = require('./config/extractStyle');
const ExtLibs = require('./config/variables.js');

module.exports = (env, debug) => {
    return {
        mode: env == "dev" || debug ? 'development' : 'production',
        entry: ENTRIES,
        resolve: {
            extensions: ['.json', '.js', '.jsx', '.ts', '.tsx', '.css', '.scss', '.vue'],
            alias: {
                vue$: 'vue/dist/vue.esm.js'
            }
        },
        module: {
            rules: LOADERS(env)
        },
        externals: ExtLibs.externals,
        plugins: [
            extractStyle,
            new CleanWebpackPlugin([PATHS.src, PATHS.dist]),
            new VueLoaderPlugin()
        ],
        output: {
            path: env === "dev" ? PATHS.src : PATHS.dist,
            publicPath: env === "dev" ? 'src/' : 'dist/',
            filename: 'scripts/[name].js',
            sourceMapFilename: '[name].map'
        }
    };
};