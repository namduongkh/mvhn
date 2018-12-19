global.BASE_PATH = __dirname;

function buildConfig(env, argv) {
    return require('./webpack/' + env + '.config.js')({ env: env, debug: argv.debug })
}

module.exports = buildConfig