'use strict';

import mongoose from "mongoose";
import async from "async";
import _ from "lodash";

const Schema = mongoose.Schema;

export default class TextSearchModelCreator {
  constructor(rootModelName, indexFields = ["_id"]) {
    this.rootModelName = rootModelName;
    this.textSeachModelName = `${rootModelName}TextSearch`
    this.rootModel = mongoose.model(rootModelName);
    this.rootModelSchema = this.rootModel.schema;
    this.indexFields = indexFields;
  }

  perform() {
    let that = this;
    var TextSeachSchema = new Schema({
      text: {
        type: String,
        trim: true,
        require: true,
        index: true
      },
      object: {
        type: Schema.Types.ObjectId,
        ref: that.rootModelName
      }
    }, {
        timestamps: true,
        collection: `${that.rootModelName.toLowerCase()}_text_searchs`
      });

    TextSeachSchema.statics.reindex = async function () {
      await reindex(that.rootModelName, that.textSeachModelName, that.indexFields);
    }
    TextSeachSchema.statics.removeNotExist = async function () {
      await removeNotExist(that.rootModelName, that.textSeachModelName, that.indexFields);
    }

    that.postSaveRootModel();

    return mongoose.model(that.textSeachModelName, TextSeachSchema);
  }

  postSaveRootModel() {
    let that = this;
    that.rootModelSchema.post('save', async function (doc) {
      if (doc.disableIndex) return;
      let docFields = _.keys(doc.toJSON());
      let intersections = _.intersection(docFields, that.indexFields);
      if (!doc.isNew && !intersections.length) return;
      await indexObject(that.rootModelName, that.textSeachModelName, that.indexFields, doc);
    });

    that.rootModelSchema.post('remove', async function (doc) {
      const TextSearchModel = mongoose.model(that.textSeachModelName);
      let object = await TextSearchModel.findOne({ object: doc._id });
      if (!object) return;
      await object.remove();
      console.log("Remove index:", doc._id);
    });

    delete mongoose.connection.models[that.rootModelName];

    mongoose.model(that.rootModelName, that.rootModelSchema);
  }
}

async function reindex(rootModelName, textSeachModelName, indexFields) {
  return new Promise(async (rs, rj) => {
    try {
      const RootModel = mongoose.model(rootModelName);
      let count = await RootModel.count().lean();
      let limit = 2000;
      let parallelArray = [];

      for (let i = 0; i < count; i += limit) {
        parallelArray.push(async function () {
          let proccessed = 0;

          let list = await RootModel.find().skip(i).limit(limit).lean();

          for (let i in list) {
            await indexObject(rootModelName, textSeachModelName, indexFields, list[i]);
            proccessed++;
          }

          return proccessed;
        });
      }

      async.parallel(parallelArray, function (err, datas) {
        console.log('Reindexed:', _.sum(datas));
        rs();
      });
    } catch (error) {
      console.log('Reindex error:', error);
      rs();
    }
  });
}

async function removeNotExist(rootModelName, textSeachModelName, indexFields) {
  return new Promise(async (rs, rj) => {
    try {
      const RootModel = mongoose.model(rootModelName);
      const TextSeachModel = mongoose.model(textSeachModelName);
      let modelIds = (await RootModel.find({}, "_id").lean()).map((record) => { return record._id });

      let count = await TextSeachModel.count({ _id: { $nin: modelIds } }).lean();
      let limit = 2000;
      let parallelArray = [];

      for (let i = 0; i < count; i += limit) {
        parallelArray.push(async function () {
          let proccessed = 0;

          let list = await TextSeachModel.find({ _id: { $nin: modelIds } }).skip(i).limit(limit);

          for (let i in list) {
            await list[i].remove();
            proccessed++;
          }

          return proccessed;
        });
      }

      async.parallel(parallelArray, function (err, datas) {
        console.log('Removed:', _.sum(datas));
        rs();
      });
    } catch (error) {
      console.log('Remove not exist error:', error);
      rs();
    }
  });
}

async function indexObject(rootModelName, textSeachModelName, indexFields, rootObject) {
  try {
    const TextSearchModel = mongoose.model(textSeachModelName);
    let object = await TextSearchModel.findOne({ object: rootObject._id }) || new TextSearchModel({ object: rootObject._id });

    object.text = indexFields.map((field) => {
      return rootObject[field] || '';
    }).join(' ');

    console.log(`${rootModelName} indexed:`, rootObject._id);

    return await object.save();
  } catch (error) {
    console.log(`${rootModelName} indexed error:`, error);
  }
}