import Util from "./util";
import moment from "moment";

const { execSync } = require('child_process');

run().then((msg) => {
  if (msg) console.log(msg);
  process.exit();
});

async function run() {
  return new Promise(async (rs, rj) => {
    let dbConfig = Util.Config.get('web.db');
    let { host, name, user, password } = dbConfig;
    let command = "mongodump";
    if (host) command += " -h " + host;
    if (name) command += " -d " + name;
    if (user && password) command += ` -u ${user} -p ${password}`;

    let backupDir = `${Util.Path.storages()}/${moment().format('DD-MM-YYYY')}`;
    let result = execSync(`${command} -o ${backupDir}`, {
      encoding: 'utf-8'
    });

    console.log(result);

    await Util.zipFolder(`${backupDir}/${name}`, {
      removeAfterZip: false
    });

    rs();
  });
}
