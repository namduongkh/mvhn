import Util from "./util";
import moment from "moment";

const { execSync } = require('child_process');

run().then((msg) => {
  if (msg) console.log(msg);
  process.exit();
});

async function run() {
  return new Promise(async (rs, rj) => {
    let { name } = Util.Config.get('web.db');
    let backupDir = `${Util.Path.storages()}/${moment().format('DD-MM-YYYY')}`;
    let command = `mongodump --uri ${Util.connectUrl()} -o ${backupDir}`;

    console.log(`Running: ${command}`)
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
