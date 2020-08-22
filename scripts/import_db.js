import Util from "./util";
import fs from "fs";

const { execSync } = require('child_process');

run().then((msg) => {
  if (msg) console.log(msg);
  process.exit();
});

async function run() {
  return new Promise(async (rs, rj) => {
    let date = process.argv[2] || await Util.inputRequest('Date (DD-MM-YYYY): ');

    if (!date || !fs.existsSync(`${Util.Path.storages()}/${date}`)) return rs('Please provice date');

    let { name } = Util.Config.get('web.db');
    let command = `mongorestore --uri ${Util.connectUrl()} -d ${name} ${Util.Path.storages()}/${date}/${name}`;

    console.log(`Running: ${command}`)
    let result = execSync(`${command}`, {
      encoding: 'utf-8'
    });

    console.log(result);

    rs();
  });
}
