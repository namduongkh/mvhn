import Util from "./util";

function production() {
}

function development() {
  Util.execCommands([
    'npm run clean:prod',
    'webpack --env.env=prod --env.dir=web --progress --profile --colors',
    'webpack --env.env=prod --env.dir=cms --progress --profile --colors'
  ])
}

(function () {
  switch (process.env.NODE_ENV) {
    case 'production':
      return production();
    default:
      return development();
  }
})();
