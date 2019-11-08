import mongoose from "mongoose";
import _ from "lodash";
import { diff, addedDiff, deletedDiff, updatedDiff, detailedDiff } from 'deep-object-diff';

const AuditLog = mongoose.model('AuditLog');

export default class AuditLogger {
  constructor(modelName, options = {}) {
    options = Object.assign({
      except: []
    }, options);

    this.modelName = modelName;
    this.model = mongoose.model(modelName);
    this.schema = this.model.schema;
    this.attributes = options.only || Object.keys(this.schema.obj).filter((attr) => !options.except.includes(attr));
    this.initial();
  }

  async initial() {
    this.schema.post('save', async (doc) => {
      let oldVersion = await AuditLog.findOne({
        objectType: this.modelName,
        objectId: doc._id
      }).sort('-version').lean() || {};

      let newVersion = new AuditLog({
        objectType: this.modelName,
        objectId: doc._id
      });

      let docAttributes = _.pick(doc, this.attributes);

      if (!oldVersion.changes) {
        newVersion.changes = docAttributes;
      } else {
        newVersion.changes = updatedDiff(oldVersion.changes, docAttributes);
      }

      newVersion.version = (oldVersion.version || 0) + 1;
      newVersion.save();
    });

    this.schema.post('remove', async (doc) => {
      let allLogs = await AuditLog.find({
        objectType: this.modelName,
        objectId: doc._id
      });

      allLogs.forEach((log) => log.remove());
    });
  }
}
