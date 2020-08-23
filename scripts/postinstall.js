import Util from "./util";

function production() {
  Util.execCommands([
    'node -r babel-core/register -r babel-polyfill ./scripts/migrate up all',
    'node -r babel-core/register -r babel-polyfill ./scripts/generate_sitemaps',
  ])
}

function development() { }

(function () {
  switch (process.env.NODE_ENV) {
    case 'production':
      return production();
    default:
      return development();
  }
})();
