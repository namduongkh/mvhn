'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const Property = mongoose.model('Property');

let exceptTextFields = [];

let textFields = ["_id"];

for (let i in Property.schema.obj) {
  if (!exceptTextFields.includes(i) && String == Property.schema.obj[i].type) {
    textFields.push(i);
  }
}

var PropertySchema = Property.schema; 

var PropertyTextSearchSchema = new Schema({
  text: {
    type: String,
    trim: true,
    require: true,
    index: true
  },
  object: {
    type: Schema.Types.ObjectId,
    ref: 'Property'
  }
}, {
    timestamps: true,
    collection: 'property_text_searchs'
  });

async function indexObject(doc) {
  try {
    const TextSearch = mongoose.model('PropertyTextSearch');
    let object = await TextSearch.findOne({ object: doc._id }) || new TextSearch({ object: doc._id });
    let text = '';
    textFields.forEach((field) => {
      if (!doc[field]) return;
      text += (doc[field] + ' ');
    });

    object.text = text;
    console.log('Property index', doc._id);

    return await object.save();
  } catch (error) {
    console.log('Property index error: ', error);
  }
}

PropertyTextSearchSchema.statics.reindex = async function () {
  return new Promise(async (rs, rj) => {
    try {
      const Property = mongoose.model('Property');
      let count = await Property.count().lean();
      let limit = 5000;
      let skip = [];

      for (let i = 0; i < count; i += limit) {
        let list = await Property.find().skip(i).limit(limit).lean();

        for (let i in list) {
          await indexObject(list[i]);
        }
      }

      rs();
    } catch (error) {
      console.log('Reindex error', error);
      rs();
    }
  });
}

PropertySchema.post('save', async function (doc) {
  await indexObject(doc);
});

PropertySchema.post('remove', async function(doc) {
  const TextSearch = mongoose.model('PropertyTextSearch');
  let object = await TextSearch.findOne({ object: doc._id });
  if (!object) return;
  await object.remove();
});

delete mongoose.connection.models['Property'];

mongoose.model('Property', PropertySchema);

module.exports = mongoose.model('PropertyTextSearch', PropertyTextSearchSchema);
