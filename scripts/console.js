import mongoose from "mongoose";
import _ from "lodash";
import Util from "./util";

Util.connectMongoDB();
let variables = {};
let constants = {};
let commandHistories = [];

for (let key in mongoose.models) {
  constants[key] = mongoose.model(key);
}

run().then((msg) => {
  if (msg) console.log(msg);
  process.exit();
});

async function run() {
  return new Promise(async (rs, rj) => {
    await execute(rs);
  });
}

async function execute(rs, commandIndex = -1) {
    try {
      let command = commandHistories[commandIndex];
      command = await Util.inputRequest(`console: `, (command || ''));
      if (command == 'exit') return rs();
      if (command == 'last') {
        return await execute(rs, commandIndex + 1);
      }

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
          commandHistories.unshift(command);
        }

        runCommand().then(async function() {
          await execute(rs);
        }).catch(async function(error) {
          console.log('Console Error:');
          console.log(error);
          await execute(rs);
        });
      `);
    } catch (error) {
      console.log('Console Error:');
      console.log(error);
      await execute(rs);
    }
}