const PATHS = require('./config/path');
const rules = require('./config/rules');
const entries = require('./config/entries'); // Should require before require plugin
const plugins = require('./config/plugins');
const ExtLibs = require('./config/variables.js');

function resolve(dir) {
    return dir;
}

module.exports = function (env) {
    return {
        target: ExtLibs.target,
        entry: entries,
        resolve: {
            extensions: ['.json', '.js', '.jsx', '.ts', '.tsx', '.css', '.scss', '.vue'],
            alias: {
                '@': resolve(PATHS.plugin),
                '@CmsCore': resolve(PATHS.plugin + '/cms/views/skin/core'),
                '@Utils': resolve(PATHS.app + '/utils'),
                '@app': resolve(PATHS.app),
                '@Plugin': resolve(PATHS.plugin),
                vue$: 'vue/dist/vue.esm.js'
            },
            symlinks: false,
            cacheWithContext: false
        },
        output: {
            path: env === "dev" ? PATHS.src : PATHS.dist,
            publicPath: env === "dev" ? 'src/' : 'dist/',
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
                    commons: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'initial'
                    }
                }
            }
        }
    };
};
