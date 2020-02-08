import _ from "lodash";
import fs from "fs";
import Excel from 'exceljs';
import mongoose from "mongoose";

const Batchlog = mongoose.model('Batchlog');

export default class Importer {

  constructor(params = {}) {
    this.params = params;
    this.file = BASE_PATH + '/public/' + params.file;
    if (!this.file || !fs.existsSync(this.file)) throw 'No file to import';

    this.workbook = new Excel.Workbook();
    this.getBatchlog();
  }

  async perform() {
    if (!this.file) throw new Error('No file to import');
    if (!this.run) throw new Error('Importer instance need define function `run`');

    this.batchlog = await this.getBatchlog();
    this.batchlog.setStatus('running');

    await this.readFile();
    await this.run();

    this.batchlog = await this.batchlog.save();
  }

  async getBatchlog() {
    if (this.batchlog) return this.batchlog;

    this.batchlog = this.params.batchlogId ? await Batchlog.findOne({ _id: this.params.batchlogId }) : new Batchlog({
      name: this.params.classname || this.constructor.name || 'Importer',
      type: this.params.classname || this.constructor.name || 'Importer',
    });

    this.batchlog = await this.batchlog.save();
    return this.batchlog;
  }

  async readFile() {
    let ext = this.file.split('.').pop();

    return await {
      'xlsx': this.workbook.xlsx,
      'csv': this.workbook.csv,
    }[ext].readFile(this.file);
  }

  async eachRow(callback) {
    let actualRowCount = this.workbook.getWorksheet(1).actualRowCount;

    for (let i = 2; i <= actualRowCount; i++) {
      await callback(this.parseRow(this.workbook.getWorksheet(1).getRow(i).values), actualRowCount - 1);
    }
  }

  parseRow(values) {
    let object = {};
    let headers = this.workbook.getWorksheet(1).getRow(1).values;
    headers.shift();

    for (let i in headers) {
      let columnName = headers[i];
      let value = values[Number(i) + 1];
      object[columnName] = value && (value.text || value);
    }

    return object;
  }
}
