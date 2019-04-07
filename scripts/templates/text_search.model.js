'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const <%= modelName %> = mongoose.model('<%= modelName %>');

let exceptTextFields = [];

let textFields = [];

for (let i in <%= modelName %>.schema.obj) {
  if (!exceptTextFields.includes(i) && String == <%= modelName %>.schema.obj[i].type) {
    textFields.push(i);
  }
}

var <%= modelName %>Schema = new Schema(<%= modelName %>.schema.obj, <%= modelName %>.schema.options); 

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

module.exports = mongoose.model('<%= modelName %>TextSearch', <%= modelName %>TextSearchSchema);

delete mongoose.connection.models['<%= modelName %>'];

<%= modelName %>Schema.post('save', async function (doc) {
  try {
    const TextSearch = mongoose.model('<%= modelName %>TextSearch');
    let object = await TextSearch.findOne({ object: doc._id }) || new TextSearch({ object: doc._id });
    let text = '';
    textFields.forEach((field) => {
      if (!doc[field]) return;
      text += (doc[field] + ' ');
    });

    object.text = text;
    console.log('Text search: ', doc._id);

    return await object.save();
  } catch (error) {
    console.log(error);
  }
});

mongoose.model('<%= modelName %>', <%= modelName %>Schema);