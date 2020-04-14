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
                '@': resolve(PATHS.module),
                '@CmsCore': resolve(PATHS.module + '/cms/views/skin/core'),
                // '@general': resolve(PATHS.htmlModulePath + '/skin/core/vue/general'),
                // '@Core': resolve(PATHS.htmlModulePath) + '/skin/core/scripts',
                '@Utils': resolve(PATHS.app + '/utils'),
                vue$: 'vue/dist/vue.esm.js'
            }
        },
        output: {
            path: env === "dev" ? PATHS.src : PATHS.dist,
            publicPath: env === "dev" ? 'src/' : 'dist/',
            filename: 'scripts/[name].js',
            chunkFilename: '[name].js',
            sourceMapFilename: '[name].map'
        },
        plugins: plugins,
        module: {
            rules
        },
        externals: ExtLibs.externals,
    };
};
