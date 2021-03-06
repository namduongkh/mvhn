const PATHS = require('./config/path');
const rules = require('./config/rules');
const plugins = require('./config/plugins');
const entries = require('./config/entries');
const ExtLibs = require('./config/variables.js');
const path = require('path');

function resolve(dir) {
    // return path.join(__dirname, '../..', dir);
    return dir;
}

module.exports = function (env) {
    return {
        target: ExtLibs.target,
        entry: entries,
        resolve: {
            extensions: ['.json', '.js', '.jsx', '.ts', '.tsx', '.css', '.scss', '.vue'],
            alias: {
                '@': resolve(PATHS.module),
                '@app': resolve(PATHS.app),
                '@module': resolve(PATHS.module + '/skin/modules'),
                '@general': resolve(PATHS.module + '/skin/core/vue/general'),
                '@Core': resolve(PATHS.module) + '/skin/core/scripts',
                '@Plugin': resolve(PATHS.plugin),
                vue$: 'vue/dist/vue.esm.js'
            },
            symlinks: false,
            cacheWithContext: false
        },
        output: {
            path: env === "dev" ? PATHS.src : PATHS.dist,
            publicPath: env === "dev" ? 'cms/src/' : 'cms/dist/',
            filename: 'scripts/[name].js',
            chunkFilename: 'scripts/[name].js',
            sourceMapFilename: 'scripts/[name].map'
        },
        plugins: plugins,
        module: {
            rules
        },
        externals: ExtLibs.externals,
        optimization: {
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendor',
                        chunks: 'initial',
                    }
                }
            }
        }
    };
};
