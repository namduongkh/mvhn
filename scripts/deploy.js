import Util from "./util";

(function () {
  Util.execCommands([
    'npm run clean:prod',
    'webpack --env.env=prod --env.dir=web --progress --profile --colors',
    'webpack --env.env=prod --env.dir=cms --progress --profile --colors',
    'sleep 10',
    `git add . && git commit -am "Build App ${Date.now()}"`,
    `git push origin master`,
    `git push heroku master`
  ])
})();
