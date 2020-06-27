import Util from "./util";

function production() {
  Util.execCommands([
    'node -r babel-core/register -r babel-polyfill ./scripts/migrate up all',
    'node -r babel-core/register -r babel-polyfill ./scripts/generate_sitemaps',
    'node -r babel-core/register -r babel-polyfill app.js'
  ])
}

function development() {
  Util.execCommands([
    'npm run webpack:server:once',
    'npm-run-all --parallel clean:dev webpack:web webpack:cms webpack:server:nodemon webpack:server:watch'
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
