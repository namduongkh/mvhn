import Util from "./util";
import fs from "fs";

const { execSync } = require('child_process');

run().then((msg) => {
  if (msg) console.log(msg);
  process.exit();
});

async function run() {
  return new Promise(async (rs, rj) => {
    let date = await Util.inputRequest('Date (DD-MM-YYYY): ');

    if (!date || !fs.existsSync(`${Util.Path.storages()}/${date}`)) return rs('Please provice date');

    let dbConfig = Util.Config.get('web.db');
    let { host, name, user, password } = dbConfig;
    let command = "mongorestore";
    if (host) command += " -h " + host;
    if (name) command += " -d " + name;
    if (user && password) command += ` -u ${user} -p ${password}`;

    let result = execSync(`${command} ${Util.Path.storages()}/${date}/${name}`, {
      encoding: 'utf-8'
    });

    console.log(result);

    rs();
  });
}
