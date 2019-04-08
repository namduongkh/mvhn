'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const <%= modelName %> = mongoose.model('<%= modelName %>');

let exceptTextFields = [];

let textFields = ["_id"];

for (let i in <%= modelName %>.schema.obj) {
  if (!exceptTextFields.includes(i) && String == <%= modelName %>.schema.obj[i].type) {
    textFields.push(i);
  }
}

var <%= modelName %>Schema = <%= modelName %>.schema; 

var <%= modelName %>TextSearchSchema = new Schema({
  text: {
    type: String,
    trim: true,
    require: true,
    index: true
  },
  object: {
    type: Schema.Types.ObjectId,
    ref: '<%= modelName %>'
  }
}, {
    timestamps: true,
    collection: '<%= modelName.toLowerCase() %>_text_searchs'
  });

async function indexObject(doc) {
  try {
    const TextSearch = mongoose.model('<%= modelName %>TextSearch');
    let object = await TextSearch.findOne({ object: doc._id }) || new TextSearch({ object: doc._id });
    let text = '';
    textFields.forEach((field) => {
      if (!doc[field]) return;
      text += (doc[field] + ' ');
    });

    object.text = text;
    console.log('<%= modelName %> index', doc._id);

    return await object.save();
  } catch (error) {
    console.log('<%= modelName %> index error: ', error);
  }
}

<%= modelName %>TextSearchSchema.statics.reindex = async function () {
  return new Promise(async (rs, rj) => {
    try {
      const <%= modelName %> = mongoose.model('<%= modelName %>');
      let count = await <%= modelName %>.count().lean();
      let limit = 5000;
      let skip = [];

      for (let i = 0; i < count; i += limit) {
        let list = await <%= modelName %>.find().skip(i).limit(limit).lean();

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

<%= modelName %>Schema.post('save', async function (doc) {
  await indexObject(doc);
});

<%= modelName %>Schema.post('remove', async function(doc) {
  const TextSearch = mongoose.model('<%= modelName %>TextSearch');
  let object = await TextSearch.findOne({ object: doc._id });
  if (!object) return;
  await object.remove();
  console.log("Remove index: ", doc._id);
});

delete mongoose.connection.models['<%= modelName %>'];

mongoose.model('<%= modelName %>', <%= modelName %>Schema);

module.exports = mongoose.model('<%= modelName %>TextSearch', <%= modelName %>TextSearchSchema);
