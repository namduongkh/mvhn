import Util from "./util";
import { argv } from 'yargs';

function production() {
  Util.execCommands([
    'node -r babel-core/register -r babel-polyfill app.js'
  ])
}

function development() {
  let keys = Object.keys(argv);

  let additionalCommand = [];

  if (keys.includes('full')) {
    keys = keys.concat(['clean', 'web', 'cms']);
  }

  if (keys.includes('clean')) additionalCommand.push("clean:dev");
  if (keys.includes('web')) additionalCommand.push("webpack:web");
  if (keys.includes('cms')) additionalCommand.push("webpack:cms");

  Util.execCommands([
    `npm run webpack:server:once && npm-run-all --parallel webpack:server:nodemon webpack:server:watch ${additionalCommand.join(' ')}`
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
