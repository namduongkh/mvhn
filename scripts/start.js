import Util from "./util";
import { argv } from 'yargs';

function production() {
  Util.execCommands([
    'node -r babel-core/register -r babel-polyfill app.js'
  ])
}

function development() {
  let options = Object.assign({}, argv);

  let additionalCommand = [];

  if (options.full) {
    options.clean = true;
    options.web = true;
    options.cms = true;
  }

  if (options.clean) additionalCommand.push("clean:dev");
  if (options.web) additionalCommand.push("webpack:web");
  if (options.cms) additionalCommand.push("webpack:cms");

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
