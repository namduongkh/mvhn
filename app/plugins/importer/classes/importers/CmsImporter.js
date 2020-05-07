import Base from './base';
import mongoose from "mongoose";
import _ from "lodash";

export default class CmsImporter extends Base {
  async run() {
    if (!this.params.importModel || !mongoose.model(this.params.importModel)) {
      this.batchlog.log("Please provide import model");
      this.batchlog.setStatus("error");
    } else {
      this.MODEL = mongoose.model(this.params.importModel);

      await this.eachRow(async (row, total) => {
        await this.importRecord(row);
        this.batchlog.progress += 100 / total;
        this.batchlog = await this.batchlog.save();
      });

      this.batchlog.progress = 100;
      this.batchlog = await this.batchlog.save();

      this.batchlog.setStatus("success");
    }
  }

  async importRecord(object) {
    let data = {};
    for (let i in this.MODEL.schema.obj) {
      if (this.MODEL.schema.obj[i].type) {
        data[i] = object[i] || data[i];
      }
    }

    let record = new this.MODEL(data);

    try {
      await record.save();
      return record;
    } catch (e) {
      this.batchlog.log("Failed to import" + JSON.stringify(object));
    }
  }
}
