import Util from "./util";
import { argv } from 'yargs';
import _ from 'lodash';

function production() {
  Util.execCommands([
    'node -r babel-core/register -r babel-polyfill app.js'
  ])
}

function development() {
  let keys = Object.keys(argv);

  let additionalCommand = [];

  if (keys.includes('full')) {
    keys = keys.concat(['server', 'clean', 'web', 'cms']);
  }

  keys = _.uniq(keys.concat(['server']));

  if (keys.includes('clean')) additionalCommand.push("clean:dev");
  if (keys.includes('web')) additionalCommand.push("webpack:web");
  if (keys.includes('cms')) additionalCommand.push("webpack:cms");
  if (keys.includes('server'))
    additionalCommand.push("webpack:server:watch webpack:server:nodemon");

  Util.execCommands([
    `npm run webpack:server:once && npm-run-all --parallel ${additionalCommand.join(' ')}`
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
