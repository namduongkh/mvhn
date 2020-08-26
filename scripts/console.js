import mongoose from "mongoose";
import _ from "lodash";
import Util from "./util";
import readline from "readline";
import Server from "../app/libs/server";
import vm from "vm";

run().then((msg) => {
  if (msg) console.log(msg);
  process.exit(0);
});

async function run() {
  let context = _.merge(context, {
    require,
    console,
    ...global,
    server: await (new Server(BASE_PATH)).init()
  });

  for (let key in mongoose.models) {
    context[key] = mongoose.model(key);
  }

  return new Promise(async (rs, rj) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: '> '
    });

    rl.prompt();

    rl.on('line', async (line) => {
      if (line == 'exit') return rl.close();

      if (!line) return rl.prompt();

      let code = `
        (async function () {
          return (${line.replace(/(var|let|const)(\s)*/gi, '')});
        })();
      `;
      let vmScript = new vm.Script(code);
      let result = vmScript.runInContext(vm.createContext(context));

      result.then((result) => {
        console.log(result);
        rl.prompt();
      });
    }).on('close', () => {
      rs();
    });
  });
}
