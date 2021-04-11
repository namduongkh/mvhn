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

  if (keys.includes('clean')) additionalCommand.push('"npm:clean:dev"');
  if (keys.includes('web')) additionalCommand.push('"npm:webpack:web"');
  if (keys.includes('cms')) additionalCommand.push('"npm:webpack:cms"');
  if (keys.includes('server'))
    additionalCommand.push('"npm:webpack:server:watch" "npm:webpack:server:nodemon"');

  Util.execCommands([
    `concurrently "npm:webpack:server:once" ${additionalCommand.join(' ')}`
  ])
}

(function () {
  switch (argv.env || process.env.NODE_ENV) {
    case 'production':
      return production();
    default:
      return development();
  }
})();
