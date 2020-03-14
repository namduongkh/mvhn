import Util from "./util";

function production() {
  Util.execCommands([
    'cd ./scripts && node -r esm migrate up all',
    'cd ./scripts && node -r esm generate_sitemaps',
    'node -r esm app.js'
  ])
}

function development() {
  Util.execCommands([
    'npm-run-all --parallel clean:dev webpack:web webpack:cms nodemon'
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
