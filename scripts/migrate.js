import Util from "./util";
import mongoose from "mongoose";
import Glob from "glob";
import fs from "fs";
import async from "async";

Util.connectMongoDB();

const Migration = mongoose.model('Migration');

class MigrationRunner {
  constructor(file, version) {
    this.file = file;
    this.version = this.version || (this.file.match(/\d{14}/) && this.file.match(/\d{14}/)[0]);
  }

  async up() {
    if (!this.version || !this.file) return;
    let migration = await Migration.findOne({ version: this.version }).lean();

    const MigrationClass = await require(Util.Path.migrations() + '/' + this.file).default;
    let migrationInstance = new MigrationClass();

    if (!migration) {
      await migrationInstance.up();
      await new Migration({
        version: this.version
      }).save();
      console.log(`== Migrated ${MigrationClass.name} successfully`);
    } else {
      console.log(`Migration ${MigrationClass.name} has been ran`);
    }
  }

  async down() {
    if (!this.version || !this.file) return;
    let migration = await Migration.findOne({ version: this.version });

    const MigrationClass = await require(Util.Path.migrations() + '/' + this.file).default;
    let migrationInstance = new MigrationClass();

    if (migration) {
      await migrationInstance.down();
      await migration.remove();
      console.log(`== Reverted ${MigrationClass.name} successfully`);
    } else {
      console.log(`Migration ${MigrationClass.name} hasn't been ran`);
    }
  }
}

function run() {
  const MigrationType = {
    'up': 1,
    'down': 2
  }

  const MigrationTypeReverted = {
    1: 'up',
    2: 'down'
  }

  const AllType = {
    'all': 1,
    'version': 2
  }

  const AllTypeReverted = {
    1: 'all',
    2: 'version'
  }

  return new Promise(async (rs, rj) => {
    let type = Number(MigrationType[process.argv[2]] || await Util.inputRequest('UP or DOWN?\n1. UP\n2. DOWN\n'));
    if (![1, 2].includes(type)) return rs();

    let all = Number(AllType[process.argv[3]] || await Util.inputRequest('ALL or VERSION?\n1. ALL\n2. VERSION\n'));
    if (![1, 2].includes(all)) return rs();

    if (all == 1) {
      console.log(`migrate ${MigrationTypeReverted[type]} ${AllTypeReverted[all]}`);
      let files = fs.readdirSync(Util.Path.migrations());

      try {
        for (let i in files) {
          let file = files[i];
          let runner = new MigrationRunner(file);
          await runner[MigrationTypeReverted[type]]();
        }
      } catch (error) {
        return rs(error);
      }

      return rs();
    } else {
      let version = process.argv[4] || await Util.inputRequest('Version: ');
      if (!version) return rs();

      let file = Glob.sync(Util.Path.migrations() + '/' + version + '*.js')[0];
      if (!file) return rs();

      console.log(`migrate ${MigrationTypeReverted[type]} ${AllTypeReverted[all]} ${version}`);
      let runner = new MigrationRunner(file.replace(Util.Path.migrations(), ''));

      try {
        await runner[MigrationTypeReverted[type]]();
      } catch (error) {
        return rs(error);
      }

      return rs();
    }
  });
}

run().then((msg) => {
  if (msg) console.log(msg);
  process.exit();
}).catch((error) => {
  if (error) console.log(error);
  process.exit();
});
