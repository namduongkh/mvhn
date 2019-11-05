import mongoose from "mongoose";
import _ from "lodash";
import Util from "./util";
import readline from "readline";

Util.connectMongoDB();
let variables = {};
let constants = {};

for (let key in mongoose.models) {
  constants[key] = mongoose.model(key);
}

run().then((msg) => {
  if (msg) console.log(msg);
  process.exit(0);
});

async function run() {
  return new Promise(async (rs, rj) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: '> '
    });

    rl.prompt();

    rl.on('line', async (line) => {
      await excute(line);

      rl.prompt();
    }).on('close', () => {
      rs();
    });
  });
}

async function excute(command) {
  if (!command) return;

  return new Promise((rs) => {
    command = command.replace(/(let|var)\s+(\w[\d\w_$]*)\s+/, 'variables[\'$2\'] ');
    command = command.replace(/const\s+(\w[\d\w_$]*)\s+/, 'constants[\'$1\'] ');

    let setVariables = '';
    for (let key in constants) {
      setVariables += `const ${key} = constants['${key}'];\n`;
    }
    for (let key in variables) {
      setVariables += `var ${key} = variables['${key}'];\n`;
    }

    eval(`
      async function runCommand() {
        ${setVariables}\n
        console.log(${command});
      }

      runCommand().then(async function() {
        rs();
      }).catch(async function(error) {
        console.log(error);
        rs();
      });
    `);
  });
}
