import Util from "./util";

(function () {
  Util.execCommands([
    `git add . && git commit -am "Build App ${Date.now()}"`,
    `git push origin master`,
    `git push heroku master`
  ])
})();
